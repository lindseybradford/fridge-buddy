import { Helmet, HelmetData } from "react-helmet-async";
import { APP_CONSTS } from "@src/configs/app-constants";

interface HeadProps {
  title?: string;
  description?: string;
}

const helmetData = new HelmetData({});

export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | ${APP_CONSTS.APP_NAME}` : undefined}
      defaultTitle={APP_CONSTS.APP_NAME}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
