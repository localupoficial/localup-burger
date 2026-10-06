import { base44 } from '@/api/base44Client';
import { DEMO_BANNERS, DEMO_PRODUCTS } from '@/data/demoCatalog';

const isDev = import.meta.env.DEV;

function logDemo(reason, detail) {
  if (!isDev) return;
  console.info(`[LOCALUP] Base44 indisponível — usando catálogo DEMO. (${reason})`, detail || '');
}

/**
 * Carrega produtos ativos do Base44.
 * Em falha ou lista vazia, retorna catálogo DEMO (portfólio) sem lançar erro.
 */
export async function fetchMenuProducts() {
  try {
    const products = await base44.entities.Product.filter({ active: true }, 'created_date', 100);

    if (Array.isArray(products) && products.length > 0) {
      return { products, source: 'base44' };
    }

    logDemo('empty', { count: Array.isArray(products) ? products.length : 0 });
    return { products: DEMO_PRODUCTS, source: 'demo' };
  } catch (error) {
    logDemo('error', {
      status: error?.status,
      message: error?.message,
    });
    return { products: DEMO_PRODUCTS, source: 'demo' };
  }
}

/**
 * Carrega banners ativos do Base44, com fallback DEMO.
 */
export async function fetchMenuBanners() {
  try {
    const banners = await base44.entities.Banner.filter({ active: true }, 'created_date', 100);

    if (Array.isArray(banners) && banners.length > 0) {
      return { banners, source: 'base44' };
    }

    logDemo('banners-empty');
    return { banners: DEMO_BANNERS, source: 'demo' };
  } catch (error) {
    logDemo('banners-error', {
      status: error?.status,
      message: error?.message,
    });
    return { banners: DEMO_BANNERS, source: 'demo' };
  }
}

/**
 * Cria pedido no Base44. Se a API falhar (ex.: demo local sem backend),
 * devolve um pedido DEMO compatível com OrderSuccess — sem quebrar o fluxo.
 */
export async function createOrderWithDemoFallback(payload) {
  try {
    const order = await base44.entities.Order.create(payload);
    return { order, source: 'base44' };
  } catch (error) {
    if (isDev) {
      console.info('[LOCALUP] Order.create falhou — gerando pedido DEMO local.', {
        status: error?.status,
        message: error?.message,
      });
    }

    const order = {
      id: `demo-${crypto.randomUUID()}`,
      ...payload,
      created_date: new Date().toISOString(),
      status: payload.status || 'Aguardando Confirmação',
      _demo: true,
    };

    return { order, source: 'demo' };
  }
}
