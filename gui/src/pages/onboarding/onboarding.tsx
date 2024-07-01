import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { greenButtonColor } from "../../components";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { setLocalStorage } from "../../util/localStorage";
import { Div, StyledButton } from "./components";

function Onboarding() {
  const navigate = useNavigate();
  const ideMessenger = useContext(IdeMessengerContext);

  const [hovered0, setHovered0] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const [selected, setSelected] = useState(-1);

  const { t } = useTranslation();


  return (
    <div className="p-2 max-w-96 mt-16 mx-auto">
      <h1 className="text-center">{t('welcome-to-continue')}</h1>
      <p className="text-center pb-2">
        {t('lets-find-the-setup-that-works-best-for-you')}
      </p>
      <Div
        color={"#be841b"}
        disabled={false}
        selected={selected === 0}
        hovered={hovered0}
        onClick={() => {
          setSelected(0);
        }}
        onMouseEnter={() => setHovered0(true)}
        onMouseLeave={() => setHovered0(false)}
      >
        <h3>✨ {t('cloud-models')}</h3>
        <p>
          {t('this-is-the-best-experience-continue-will-use-the-strongest-available-commercial-models-to-index-code-and-answer-questions-code-is-only-ever-stored-locally')}
        </p>
      </Div>
      {selected === 0 && (
        <p className="px-3">
          <b>{t('embeddings')}</b> Voyage Code 2
          <br />
          <br />
          <b>{t('autocomplete')}</b> {t('starcoder-7b-via-fireworks-ai-free-trial')}
          <br />
          <br />
          <b>Chat:</b> GPT-4, Claude 3, and others (free trial)
        </p>
      )}
      <br></br>
      <Div
        color={greenButtonColor}
        disabled={false}
        selected={selected === 1}
        hovered={hovered1}
        onClick={() => {
          setSelected(1);
        }}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={() => setHovered1(false)}
      >
        <h3>🔒 {t('local-models')}</h3>
        <p>
          {t('no-code-will-leave-your-computer-but-less-powerful-models-are-used-works-with-ollama-lm-studio-and-others')}
        </p>
      </Div>
      {selected === 1 && (
        <p className="px-3">
          <b>{t('embeddings')}</b> {t('local-sentence-transformers-model')}
          <br />
          <br />
          <b>{t('autocomplete')}</b> {t('starcoder2-3b-set-up-with-ollama-lm-studio-etc')}
          <br />
          <br />
          <b>{t('chat')}</b> {t('llama-3-with-ollama-lm-studio-etc')}
        </p>
      )}
      <br></br>
      {/* <p>
        <a href="https://docs.continue.dev/customization/overview">
          Read the docs
        </a>{" "}
        to learn more and fully customize Continue by opening config.json.
      </p> */}
      <Div
        color={"#1b84be"}
        disabled={false}
        selected={selected === 2}
        hovered={hovered2}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={() => setHovered2(false)}
        onClick={() => {
          setSelected(2);
          ideMessenger.post("openConfigJson", undefined);
        }}
      >
        <h3>⚙️ {t('your-own-models')}</h3>
        <p>
          {t('continue-lets-you-use-your-own-api-key-or-self-hosted-llms')}{" "}
          <a href="https://docs.continue.dev/customization/overview">
            {t('read-the-docs')}
          </a>{" "}
          {t('to-learn-more-about-using-config-json-to-customize-continue-this-can-always-be-done-later')}
        </p>
      </Div>
      {selected === 2 && (
        <p className="px-3">
          {t('use')} <code>config.json</code> {t('to-configure-your-own')}{" "}
          <a href="https://docs.continue.dev/model-setup/overview">{t('models')}</a>,{" "}
          <a href="https://docs.continue.dev/customization/context-providers">
            {t('context-providers')}
          </a>
          ,{" "}
          <a href="https://docs.continue.dev/customization/slash-commands">
            {t('slash-commands')}
          </a>
          {t('and')} <a href="https://docs.continue.dev/reference/config">{t('more')}</a>.
        </p>
      )}

      <br />
      <div className="flex">
        <StyledButton
          blurColor={
            selected === 0
              ? "#be841b"
              : selected === 1
              ? greenButtonColor
              : "#1b84be"
          }
          disabled={selected < 0}
          onClick={() => {
            ideMessenger.post("completeOnboarding", {
              mode: ["optimized", "local", "custom"][selected] as any,
            });
            setLocalStorage("onboardingComplete", true);

            if (selected === 1) {
              navigate("/localOnboarding");
            } else {
              // Only needed when we switch from the default (local) embeddings provider
              ideMessenger.post("index/forceReIndex", undefined);
              // Don't show the tutorial above yet because there's another step to complete at /localOnboarding
              ideMessenger.post("showTutorial", undefined);
              navigate("/");
            }
          }}
        >
          {t('continue-1')}
        </StyledButton>
      </div>
    </div>
  );
}

export default Onboarding;
