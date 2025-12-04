/**
 * Script de prueba para todas las peticiones API del proyecto Estucalia
 * Este script prueba todos los endpoints y muestra qué datos están llegando
 */

const https = require('https');
const http = require('http');

const API_BASE_URL = 'https://apiestucalia.innet.es';
const API_BASE_PATH = '/api';

// Función helper para hacer peticiones HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    };

    const req = protocol.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data,
            rawData: data,
            parseError: e.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }

    req.end();
  });
}

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function logSection(title) {
  console.log(`\n${colors.cyan}${colors.bright}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}${title}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}${'='.repeat(60)}${colors.reset}\n`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

// Función para mostrar datos de forma estructurada
function displayData(data, title, maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) {
    return '... (profundidad máxima alcanzada)';
  }

  if (data === null || data === undefined) {
    return 'null/undefined';
  }

  if (Array.isArray(data)) {
    return `[Array(${data.length})] ${data.length > 0 ? `\n  Primer elemento: ${JSON.stringify(data[0], null, 2).split('\n').slice(0, 3).join('\n')}...` : 'Vacío'}`;
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return '{}';
    
    let result = '{\n';
    keys.slice(0, 10).forEach(key => {
      const value = data[key];
      const valueStr = typeof value === 'object' 
        ? displayData(value, '', maxDepth, currentDepth + 1)
        : JSON.stringify(value);
      result += `    ${key}: ${valueStr}\n`;
    });
    if (keys.length > 10) {
      result += `    ... (${keys.length - 10} campos más)\n`;
    }
    result += '  }';
    return result;
  }

  return JSON.stringify(data);
}

// Tests de peticiones
async function testBlogEndpoints() {
  logSection('TESTING BLOG ENDPOINTS');

  // 1. GET /api/blog - Lista de posts
  try {
    logInfo('Probando: GET /api/blog');
    const response = await makeRequest(`${API_BASE_URL}${API_BASE_PATH}/blog`);
    
    if (response.status === 200) {
      logSuccess(`Estado: ${response.status}`);
      
      if (response.data && response.data.data) {
        const posts = response.data.data;
        logSuccess(`Posts encontrados: ${posts.length}`);
        
        if (posts.length > 0) {
          console.log(`\n${colors.magenta}Estructura del primer post:${colors.reset}`);
          console.log(displayData(posts[0]));
          
          // Verificar campos esperados
          const firstPost = posts[0];
          const expectedFields = ['id', 'title', 'description', 'slug', 'photo', 'created_at'];
          expectedFields.forEach(field => {
            if (firstPost[field] !== undefined) {
              logSuccess(`Campo "${field}": ${firstPost[field] ? 'presente' : 'vacío/null'}`);
            } else {
              logWarning(`Campo "${field}": NO encontrado`);
            }
          });

          // Guardar slug para siguiente test
          return posts[0].slug;
        } else {
          logWarning('No hay posts en la respuesta');
        }
      } else {
        logError('Estructura de respuesta inesperada');
        console.log('Respuesta completa:', JSON.stringify(response.data, null, 2));
      }
    } else {
      logError(`Estado: ${response.status}`);
      console.log('Respuesta:', response.data);
    }
  } catch (error) {
    logError(`Error: ${error.message}`);
  }

  return null;
}

async function testBlogPostDetail(slug) {
  if (!slug) {
    logWarning('No se puede probar detalle del post sin slug');
    return;
  }

  logSection('TESTING BLOG POST DETAIL');
  
  try {
    logInfo(`Probando: GET /api/blog/${slug}`);
    const response = await makeRequest(`${API_BASE_URL}${API_BASE_PATH}/blog/${slug}`);
    
    if (response.status === 200) {
      logSuccess(`Estado: ${response.status}`);
      
      if (response.data && response.data.data) {
        const post = response.data.data;
        console.log(`\n${colors.magenta}Datos completos del post:${colors.reset}`);
        console.log(displayData(post));
        
        // Verificar campos
        const expectedFields = ['id', 'title', 'description', 'slug', 'photo', 'created_at', 'updated_at'];
        expectedFields.forEach(field => {
          if (post[field] !== undefined && post[field] !== null) {
            logSuccess(`Campo "${field}": presente`);
          } else {
            logWarning(`Campo "${field}": vacío o no encontrado`);
          }
        });
      } else {
        logError('Estructura de respuesta inesperada');
        console.log('Respuesta:', JSON.stringify(response.data, null, 2));
      }
    } else {
      logError(`Estado: ${response.status}`);
      console.log('Respuesta:', response.data);
    }
  } catch (error) {
    logError(`Error: ${error.message}`);
  }
}

async function testHomeEndpoint() {
  logSection('TESTING HOME ENDPOINT');
  
  // Nota: Este endpoint usa axiosInstance con NEXT_PUBLIC_API_URL
  // Probaremos directamente con la URL base
  const homeUrl = `${API_BASE_URL}/home`;
  
  try {
    logInfo('Probando: GET /home (usando axiosInstance base URL)');
    logWarning('Nota: Este endpoint requiere NEXT_PUBLIC_API_URL configurado');
    logInfo(`Probando directamente: ${homeUrl}`);
    
    const response = await makeRequest(homeUrl);
    
    if (response.status === 200) {
      logSuccess(`Estado: ${response.status}`);
      
      if (response.data) {
        console.log(`\n${colors.magenta}Datos de home (primeros campos):${colors.reset}`);
        const homeData = response.data.data || response.data;
        console.log(displayData(homeData));
        
        // Verificar campos principales
        const mainSections = [
          'first_description_es', 'first_image_url',
          'second_title_es', 'second_description_es',
          'third_title_es', 'third_description_es'
        ];
        
        mainSections.forEach(field => {
          if (homeData[field] !== undefined) {
            logSuccess(`Campo "${field}": presente`);
          } else {
            logWarning(`Campo "${field}": no encontrado`);
          }
        });
      }
    } else {
      logError(`Estado: ${response.status}`);
      console.log('Respuesta:', response.data);
    }
  } catch (error) {
    logError(`Error: ${error.message}`);
    logWarning('Es posible que este endpoint requiera configuración de NEXT_PUBLIC_API_URL');
  }
}

async function testProductsEndpoints() {
  logSection('TESTING PRODUCTS ENDPOINTS');
  
  const productsUrl = `${API_BASE_URL}/v1/products`;
  
  try {
    logInfo(`Probando: GET ${productsUrl}`);
    const response = await makeRequest(productsUrl);
    
    if (response.status === 200) {
      logSuccess(`Estado: ${response.status}`);
      
      if (response.data && response.data.data) {
        const products = response.data.data;
        logSuccess(`Productos encontrados: ${products.length}`);
        
        if (products.length > 0) {
          console.log(`\n${colors.magenta}Estructura del primer producto:${colors.reset}`);
          console.log(displayData(products[0]));
          
          return products[0].slug;
        }
      } else {
        logError('Estructura de respuesta inesperada');
        console.log('Respuesta:', JSON.stringify(response.data, null, 2));
      }
    } else {
      logError(`Estado: ${response.status}`);
      console.log('Respuesta:', response.data);
    }
  } catch (error) {
    logError(`Error: ${error.message}`);
  }
  
  return null;
}

async function testApplicationsEndpoints() {
  logSection('TESTING APPLICATIONS ENDPOINTS');
  
  const applicationsUrl = `${API_BASE_URL}/v1/applications`;
  
  try {
    logInfo(`Probando: GET ${applicationsUrl}`);
    const response = await makeRequest(applicationsUrl);
    
    if (response.status === 200) {
      logSuccess(`Estado: ${response.status}`);
      
      if (response.data && response.data.data) {
        const applications = response.data.data;
        logSuccess(`Aplicaciones encontradas: ${applications.length}`);
        
        if (applications.length > 0) {
          console.log(`\n${colors.magenta}Estructura de la primera aplicación:${colors.reset}`);
          console.log(displayData(applications[0]));
          
          return applications[0].slug;
        }
      } else {
        logError('Estructura de respuesta inesperada');
        console.log('Respuesta:', JSON.stringify(response.data, null, 2));
      }
    } else {
      logError(`Estado: ${response.status}`);
      console.log('Respuesta:', response.data);
    }
  } catch (error) {
    logError(`Error: ${error.message}`);
  }
  
  return null;
}

async function testContactEndpoint() {
  logSection('TESTING CONTACT ENDPOINT (POST)');
  
  logWarning('Este es un endpoint POST que envía datos. Solo verificamos la estructura esperada.');
  logInfo('Endpoint: POST /api/contact');
  logInfo('Payload esperado:');
  console.log(JSON.stringify({
    name: "string",
    phone: "string",
    email: "string",
    subject: "string",
    message: "string",
    acceptPrivacyPolicy: true,
    acceptCommercialInfo: true
  }, null, 2));
  
  logInfo('Nota: Este endpoint se prueba en el formulario de contacto en la aplicación');
}

// Función principal
async function runAllTests() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   ESTUCALIA - TEST DE PETICIONES API                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}\n`);

  try {
    // Test Blog
    const blogSlug = await testBlogEndpoints();
    if (blogSlug) {
      await testBlogPostDetail(blogSlug);
    }

    // Test Home
    await testHomeEndpoint();

    // Test Products
    await testProductsEndpoints();

    // Test Applications
    await testApplicationsEndpoints();

    // Test Contact (solo info)
    await testContactEndpoint();

    logSection('RESUMEN DE TESTS');
    logSuccess('Todos los tests han sido ejecutados');
    logInfo('Revisa los resultados arriba para ver qué datos están llegando');
    logInfo('Ahora puedes levantar el servidor y verificar en el navegador');

  } catch (error) {
    logError(`Error general: ${error.message}`);
    console.error(error);
  }
}

// Ejecutar tests
runAllTests().catch(console.error);

