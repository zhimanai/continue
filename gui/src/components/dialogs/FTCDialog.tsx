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

export const ftl = () => {
  const ftc = parseInt(localStorage.getItem("ftc"));
  if (ftc && ftc > 52) {
    return 100;
  } else if (ftc && ftc > 27) {
    return 50;
  }
  return 25;
};

function FTCDialog() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");
  const dispatch = useDispatch();
  const ideMessenger = useContext(IdeMessengerContext);

  return (
    <div className="p-4">
      <h3>{t('free-trial-limit-reached')}</h3>
      <p>
        {t('youve-reached-the-free-trial-limit-of-ftl-free-inputs-to-keep-using-continue-you-can-either-use-your-own-api-key-or-use-a-local-llm-to-read-more-about-the-options-see-our')}{" "}
        <a href="https://docs.continue.dev/setup/overview" target="_blank">
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
      <GridDiv>
        <Button
          onClick={() => {
            dispatch(setShowDialog(false));
            navigate("/models");
          }}
        >
          {t('select-model')}
        </Button>
        <Button
          disabled={!apiKey}
          onClick={() => {
            ideMessenger.post("config/addOpenAiKey", apiKey);
            dispatch(setShowDialog(false));
            dispatch(setDefaultModel({ title: "GPT-4" }));
          }}
        >
          {t('use-my-api-key')}
        </Button>
      </GridDiv>
    </div>
  );
}

export default FTCDialog;
