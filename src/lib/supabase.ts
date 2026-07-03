import { createClient } from '@supabase/supabase-js';
import { Product, Coupon, Order } from '../types';

// Read configuration from Vite's environment variables
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Detect if Supabase is properly configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL');

// Initialize the Supabase Client (or null if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * DB helper: Fetch all products from Supabase
 */
export async function getSupabaseProducts(): Promise<Product[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    // Map database snake_case keys back to camelCase frontend interface
    return (data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: Number(p.price),
      discountPercent: Number(p.discount_percent),
      rating: Number(p.rating),
      ratingCount: Number(p.rating_count),
      stock: Number(p.stock),
      image: p.image,
      ingredients: p.ingredients || [],
      weightOptions: p.weight_options || [],
      weightMultipliers: p.weight_multipliers || {},
      tags: p.tags || [],
      shelfLife: p.shelf_life || '15 Days',
      reviews: p.reviews || []
    }));
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return null;
  }
}

/**
 * DB helper: Insert or update (upsert) a product in Supabase
 */
export async function upsertSupabaseProduct(p: Product): Promise<boolean> {
  if (!supabase) return false;
  try {
    const dbRow = {
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price,
      discount_percent: p.discountPercent,
      rating: p.rating,
      rating_count: p.ratingCount,
      stock: p.stock,
      image: p.image,
      ingredients: p.ingredients,
      weight_options: p.weightOptions,
      weight_multipliers: p.weightMultipliers,
      tags: p.tags,
      shelf_life: p.shelfLife,
      reviews: p.reviews
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbRow, { onConflict: 'id' });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error saving product to Supabase:', err);
    return false;
  }
}

/**
 * DB helper: Delete a product from Supabase
 */
export async function deleteSupabaseProduct(productId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting product from Supabase:', err);
    return false;
  }
}

/**
 * DB helper: Fetch all coupons from Supabase
 */
export async function getSupabaseCoupons(): Promise<Coupon[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('code');

    if (error) throw error;

    return (data || []).map((c: any) => ({
      code: c.code,
      discountPercent: Number(c.discount_percent),
      maxDiscount: Number(c.max_discount),
      description: c.description,
      minOrderAmount: Number(c.min_order_amount),
      expiryDate: c.expiry_date,
      active: Boolean(c.active)
    }));
  } catch (err) {
    console.error('Error fetching coupons from Supabase:', err);
    return null;
  }
}

/**
 * DB helper: Insert or update (upsert) a coupon in Supabase
 */
export async function upsertSupabaseCoupon(c: Coupon): Promise<boolean> {
  if (!supabase) return false;
  try {
    const dbRow = {
      code: c.code,
      discount_percent: c.discountPercent,
      max_discount: c.maxDiscount,
      description: c.description,
      min_order_amount: c.minOrderAmount,
      expiry_date: c.expiryDate,
      active: c.active
    };

    const { error } = await supabase
      .from('coupons')
      .upsert(dbRow, { onConflict: 'code' });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error saving coupon to Supabase:', err);
    return false;
  }
}

/**
 * DB helper: Fetch all customer orders from Supabase
 */
export async function getSupabaseOrders(): Promise<Order[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      items: o.items || [],
      totalAmount: Number(o.total_amount),
      discountAmount: Number(o.discount_amount),
      finalAmount: Number(o.final_amount),
      couponApplied: o.coupon_applied || undefined,
      shippingAddress: o.shipping_address,
      status: o.status,
      date: o.date,
      paymentMethod: o.payment_method,
      paymentId: o.payment_id,
      invoiceNumber: o.invoice_number,
      loyaltyPointsEarned: Number(o.loyalty_points_earned)
    }));
  } catch (err) {
    console.error('Error fetching orders from Supabase:', err);
    return null;
  }
}

/**
 * DB helper: Create a new customer order in Supabase
 */
export async function insertSupabaseOrder(o: Order): Promise<boolean> {
  if (!supabase) return false;
  try {
    const dbRow = {
      id: o.id,
      order_number: o.orderNumber,
      items: o.items,
      total_amount: o.totalAmount,
      discount_amount: o.discountAmount,
      final_amount: o.finalAmount,
      coupon_applied: o.couponApplied || null,
      shipping_address: o.shippingAddress,
      status: o.status,
      date: o.date,
      payment_method: o.paymentMethod,
      payment_id: o.paymentId,
      invoice_number: o.invoiceNumber,
      loyalty_points_earned: o.loyaltyPointsEarned
    };

    const { error } = await supabase
      .from('orders')
      .insert(dbRow);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error inserting order in Supabase:', err);
    return false;
  }
}

/**
 * DB helper: Update order status in Supabase
 */
export async function updateSupabaseOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error updating order status in Supabase:', err);
    return false;
  }
}
