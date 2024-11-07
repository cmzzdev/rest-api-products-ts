import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related with products",
      },
    ],
    info: {
      title: "REST API Nodejs / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
            content: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn041zDaAZX26Ui9CS0wLvq8NTDNEsCNuH8Q&s');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #fff;
        }
    `,
  customSiteTitle: "REST API Documentation about Product",
};

export default swaggerSpec;
export { swaggerUiOptions };
