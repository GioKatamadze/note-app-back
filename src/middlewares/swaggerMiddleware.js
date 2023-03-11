import SwaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerMiddleware = () => {
  const options = {
    customCss: "swagger-ui .toobar {display: none}",
    customSiteTitle: "Note App",
  };

  const swaggerDocument = YAML.load("./src/config/swagger.yaml");
  return [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument, options)];
};

export default swaggerMiddleware;
