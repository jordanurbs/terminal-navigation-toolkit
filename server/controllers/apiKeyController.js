import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug: Print environment variables
console.log('In apiKeyController:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? '[REDACTED]' : 'undefined');

// Initialize Supabase client with fallback for development
const supabaseUrl = process.env.SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'dummy_key_for_development';

// Create a mock Supabase client if real credentials are missing
let supabase;
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.warn('⚠️ Using mock Supabase client for development. API keys will be stored locally only.');
  
  // Create a simple mock implementation
  supabase = {
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null })
        }),
        order: () => ({ data: [], error: null })
      }),
      insert: (data) => ({
        select: async () => ({ data: [data], error: null })
      }),
      delete: () => ({
        eq: () => ({
          select: async () => ({ data: [], error: null })
        })
      }),
      upsert: (data) => ({
        select: async () => ({ data: [data], error: null })
      })
    })
  };
} else {
  // Use real Supabase client
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Path to store the master admin key
const adminKeyPath = path.join(__dirname, '..', '..', '.admin_key');

/**
 * Generate a unique API key
 * @param {number} length - Length of the API key
 * @param {string} prefix - Optional prefix for the key
 * @returns {string} - Generated API key
 */
const generateApiKey = (length = 32, prefix = '') => {
  const randomBytes = crypto.randomBytes(length);
  const apiKey = randomBytes.toString('hex').slice(0, length);
  return prefix ? `${prefix}_${apiKey}` : apiKey;
};

/**
 * Generate a master admin API key
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const generateMasterAdminKey = async (req, res) => {
  try {
    console.log('Generating master admin key...');
    console.log('Admin key path:', adminKeyPath);
    
    // Check if admin key already exists
    if (fs.existsSync(adminKeyPath)) {
      console.log('Admin key already exists, returning existing key');
      const existingKey = fs.readFileSync(adminKeyPath, 'utf8');
      return res.json({
        success: true,
        message: 'Admin key already exists',
        adminKey: existingKey
      });
    }

    // Generate a new admin key
    const adminKey = generateApiKey(32, 'admin');
    console.log('Generated new admin key:', adminKey);

    try {
      // Store the admin key in the database
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          key: adminKey,
          user_id: 'admin',
          email: 'admin@example.com',
          is_admin: true,
          created_at: new Date()
        })
        .select();

      if (error) {
        console.error('Error inserting admin key into database:', error);
        throw error;
      }
      
      console.log('Admin key stored in database');
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      // Continue with local storage even if database operation fails
    }

    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(adminKeyPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Save the admin key to a file
      fs.writeFileSync(adminKeyPath, adminKey);
      console.log('Admin key saved to file');
    } catch (fsError) {
      console.error('File system operation failed:', fsError);
      throw fsError;
    }

    res.json({
      success: true,
      message: 'Master admin key generated successfully',
      adminKey
    });
  } catch (error) {
    console.error('Error generating master admin key:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate master admin key',
      error: error.message
    });
  }
};

/**
 * Generate a customer API key
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const generateCustomerKey = async (req, res) => {
  try {
    console.log('Generating customer API key...');
    const { email, userId, purchaseId, adminKey } = req.body;
    console.log('Request body:', { email, userId, purchaseId, adminKey: adminKey ? '[REDACTED]' : undefined });

    // Development mode - simplified key generation
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.log('Development mode: Generating customer key without validation');
      
      // Validate required fields
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }
      
      // Generate a new customer key
      const customerKey = generateApiKey(32, 'cust');
      console.log('Generated new customer key:', customerKey);
      
      // Return the key without database operations
      const result = {
        success: true,
        message: 'Customer API key generated successfully (development mode)',
        apiKey: customerKey
      };
      
      // If this is called from the webhook endpoint, return the result directly
      if (!res || !res.json) {
        return result;
      }
      
      return res.json(result);
    }
    
    // Production mode - validate admin key
    if (adminKey) {
      console.log('Validating admin key...');
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', adminKey)
        .eq('is_admin', true)
        .single();

      console.log('Admin key validation result:', { data: !!data, error });
      if (error || !data) {
        if (!res || !res.json) {
          return {
            success: false,
            message: 'Invalid admin key'
          };
        }
        return res.status(401).json({
          success: false,
          message: 'Invalid admin key'
        });
      }
    }

    // Validate required fields
    if (!email) {
      if (!res || !res.json) {
        return {
          success: false,
          message: 'Email is required'
        };
      }
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Generate a new customer key
    const customerKey = generateApiKey(32, 'cust');
    console.log('Generated new customer key:', customerKey);

    try {
      // Store the customer key in the database
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          key: customerKey,
          user_id: userId || email,
          email,
          purchase_id: purchaseId,
          is_admin: false,
          created_at: new Date()
        })
        .select();

      if (error) {
        console.error('Error inserting customer key into database:', error);
        // Continue with response even if database operation fails
      } else {
        console.log('Customer key stored in database');
      }
    } catch (dbError) {
      console.error('Error inserting customer key into database:', dbError);
      // Continue with response even if database operation fails
    }

    const result = {
      success: true,
      message: 'Customer API key generated successfully',
      apiKey: customerKey
    };
    
    // If this is called from the webhook endpoint, return the result directly
    if (!res || !res.json) {
      return result;
    }
    
    return res.json(result);
  } catch (error) {
    console.error('Error generating customer API key:', error);
    
    const errorResult = {
      success: false,
      message: 'Failed to generate customer API key',
      error: error.message
    };
    
    // If this is called from the webhook endpoint, return the error directly
    if (!res || !res.json) {
      return errorResult;
    }
    
    return res.status(500).json(errorResult);
  }
};

/**
 * Verify an API key
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const verifyApiKey = async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: 'API key is required'
      });
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key'
      });
    }

    res.json({
      success: true,
      message: 'API key is valid',
      isAdmin: data.is_admin,
      userId: data.user_id,
      email: data.email
    });
  } catch (error) {
    console.error('Error verifying API key:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify API key',
      error: error.message
    });
  }
};

/**
 * Revoke an API key
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const revokeApiKey = async (req, res) => {
  try {
    const { apiKey, adminKey } = req.body;

    // Validate admin key
    const { data: adminData, error: adminError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', adminKey)
      .eq('is_admin', true)
      .single();

    if (adminError || !adminData) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin key'
      });
    }

    // Revoke the API key
    const { data, error } = await supabase
      .from('api_keys')
      .delete()
      .eq('key', apiKey)
      .select();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: 'API key revoked successfully',
      apiKey
    });
  } catch (error) {
    console.error('Error revoking API key:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke API key',
      error: error.message
    });
  }
};

export default {
  generateMasterAdminKey,
  generateCustomerKey,
  verifyApiKey,
  revokeApiKey
}; 