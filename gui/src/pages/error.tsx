import { useDispatch } from "react-redux";
import { useNavigate, useRouteError } from "react-router-dom";
import { newSession } from "../redux/slices/stateSlice";
import ContinueButton from "../components/mainInput/ContinueButton";
import { vscBackground } from "../components";
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      id="error-page"
      className="text-center"
      style={{ backgroundColor: vscBackground }}
    >
      <h1>{t('error-in-continue-react-app')}</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <p>{t('click-below-to-continue')}</p>
      <br />
      <ContinueButton
        disabled={false}
        showStop={false}
        onClick={() => {
          dispatch(newSession());
          localStorage.removeItem("persist:root");
          navigate("/");
        }}
      ></ContinueButton>
    </div>
  );
}
