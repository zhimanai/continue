import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Input } from "..";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { setDefaultModel } from "../../redux/slices/stateSlice";
import { setShowDialog } from "../../redux/slices/uiStateSlice";

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  align-items: center;
`;

function SetupLocalOrKeyDialog() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");
  const dispatch = useDispatch();

  const ideMessenger = useContext(IdeMessengerContext);

  return (
    <div className="p-4">
      <h3>{t('set-up-your-own-model')}</h3>
      <p>
        {t('to-keep-using-continue-after-your-free-inputs-you-can-either-use-your-own-api-key-or-use-a-local-llm-to-read-more-about-the-options-see-our')}{" "}
        <a
          className="cursor-pointer"
          onClick={() =>
            ideMessenger.request(
              "openUrl",
              "https://docs.continue.dev/reference/Model%20Providers/freetrial",
            )
          }
        >
          {t('documentation')}
        </a>
        .
      </p>

      <Input
        type="text"
        placeholder={t('enter-your-openai-api-key')}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <Button
        className="w-full"
        disabled={!apiKey}
        onClick={() => {
          ideMessenger.post("config/addOpenAiKey", apiKey);
          dispatch(setShowDialog(false));
          dispatch(setDefaultModel({ title: "GPT-4" }));
        }}
      >
        {t('use-my-openai-api-key')}
      </Button>
      <div className="text-center">— OR —</div>
      <GridDiv>
        <Button
          onClick={() => {
            dispatch(setShowDialog(false));
            ideMessenger.request("completeOnboarding", {
              mode: "localAfterFreeTrial",
            });
            navigate("/localOnboarding");
          }}
        >
          {t('use-local-model')}
        </Button>
        <Button
          onClick={() => {
            dispatch(setShowDialog(false));
            navigate("/models");
          }}
        >
          {t('view-all-options')}
        </Button>
      </GridDiv>
    </div>
  );
}

export default SetupLocalOrKeyDialog;
