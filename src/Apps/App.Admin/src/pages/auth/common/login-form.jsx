import React from "react";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@/contexts/KeycloakContext";

const LoginForm = () => {
  const { t } = useTranslation();
  const { login, keycloakReady } = useKeycloak();

  const handleKeycloakLogin = () => {
    if (keycloakReady) {
      login();
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        text={t("common.signIn")}
        className="btn btn-dark block w-full text-center"
        onClick={handleKeycloakLogin}
        isLoading={!keycloakReady}
      />
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
        {t("auth.signInToAccount")}
      </p>
    </div>
  );
};

export default LoginForm;
