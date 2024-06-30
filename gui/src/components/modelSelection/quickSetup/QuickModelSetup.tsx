import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, SecondaryButton } from "../..";
import { IdeMessengerContext } from "../../../context/IdeMessenger";
import { setDefaultModel } from "../../../redux/slices/stateSlice";
import { setShowDialog } from "../../../redux/slices/uiStateSlice";
import { getLocalStorage } from "../../../util/localStorage";
import { PROVIDER_INFO } from "../../../util/modelData";
import { ftl } from "../../dialogs/FTCDialog";
import QuickSetupListBox from "./QuickSetupListBox";

interface QuickModelSetupProps {}

function QuickModelSetup(props: QuickModelSetupProps) {
  const [selectedProvider, setSelectedProvider] = useState(
    PROVIDER_INFO["openai"],
  );
  const [selectedModel, setSelectedModel] = useState(
    selectedProvider.packages[0],
  );
  const formMethods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ideMessenger = useContext(IdeMessengerContext);

  useEffect(() => {
    setSelectedModel(selectedProvider.packages[0]);
  }, [selectedProvider]);

  return (
    <FormProvider {...formMethods}>
      <div className="p-4">
        <h1>
          {getLocalStorage("ftc") > ftl()
            ? t('set-up-your-own-model')
            : t('add-a-new-model')}
        </h1>

        {getLocalStorage("ftc") > ftl() && (
          <p className="text-sm text-gray-500">
            {t('youve-reached-the-free-trial-limit-of-ftl-free-inputs-to-keep-using-continue-you-can-either-use-your-own-api-key-or-use-a-local-llm-to-read-more-about-the-options-see-our', ftl())}{" "}
            <a
              href="https://docs.continue.dev/setup/overview"
              target="_blank"
              onClick={() =>
                ideMessenger.post(
                  "openUrl",
                  "https://docs.continue.dev/setup/overview",
                )
              }
            >
              {t('documentation')}
            </a>
            .
          </p>
        )}

        <h4>1. {t('select-a-provider')}</h4>
        <QuickSetupListBox
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          options={Object.entries(PROVIDER_INFO)
            .filter(([key]) => !["freetrial", "openai-aiohttp"].includes(key))
            .map(([, provider]) => provider)}
        ></QuickSetupListBox>

        <h4>2. {t('select-a-model')}</h4>
        <QuickSetupListBox
          selectedProvider={selectedModel}
          setSelectedProvider={setSelectedModel}
          options={
            Object.entries(PROVIDER_INFO).find(
              ([, provider]) => provider.title === selectedProvider.title,
            )?.[1].packages
          }
        ></QuickSetupListBox>

        {selectedProvider.apiKeyUrl && (
          <>
            <h4>3. {t('paste-your-api-key')}</h4>
            <SecondaryButton
              className="w-full border-2 border-solid"
              onClick={() => {
                ideMessenger.post("openUrl", selectedProvider.apiKeyUrl);
              }}
            >
              {t('get-api-key')}
            </SecondaryButton>
            <Input
              id="apiKey"
              className="w-full"
              placeholder={t('enter-api-key')}
              {...formMethods.register("apiKey", { required: true })}
            />
          </>
        )}
        {selectedProvider.downloadUrl && (
          <>
            <h4>3. Download {selectedProvider.title}</h4>
            <SecondaryButton
              className="w-full border-2 border-solid"
              onClick={() => {
                ideMessenger.post("openUrl", selectedProvider.downloadUrl);
              }}
            >
              {t('download')} {selectedProvider.title}
            </SecondaryButton>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            disabled={
              selectedProvider.apiKeyUrl && !formMethods.watch("apiKey")
            }
            onClick={() => {
              const model = {
                ...selectedProvider.params,
                ...selectedModel.params,
                provider: selectedProvider.provider,
                apiKey: formMethods.watch("apiKey"),
                title: selectedModel.title,
              };
              ideMessenger.post("config/addModel", { model });
              dispatch(setDefaultModel({ title: model.title, force: true }));
              navigate("/");
            }}
            className="w-full"
          >
            {t('add-model')}
          </Button>
          <Button
            onClick={() => {
              dispatch(setShowDialog(false));
              navigate("/");
            }}
            className="w-full"
          >
            {t('done')}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

export default QuickModelSetup;
