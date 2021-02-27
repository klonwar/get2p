import React, {FC, useCallback, useEffect, useState} from "react";
import {Token} from "#server/src/model/token";
import {uuidsSelector} from "#src/js/redux/selectors";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {Operations} from "#src/js/redux/operations/operations";
import {useHistory} from "react-router-dom";
import SendForm, {SendFormType} from "#components/reusable/send-form/send-form";
import UIkit from "uikit";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  generatedUuids: uuidsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorite: (data: { tokenString: string, uuid?: string }) => dispatch(FavoriteActions.addToFavorite(data)),
  requestFavicon: (protocol: string, domainUrl: string) => dispatch(Operations.requestFavicon({protocol, domainUrl})),
  createUuid: (token: Token) => dispatch(Operations.createUuid({token})),
});

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
}

const MainForm: FC<Props> = (props) => {
  const {
    generatedUuids,
    requestFavicon,
    createUuid,
    addToFavorite
  } = props;
  const history = useHistory();
  const [isBuffWriting, setBuffWriting] = useState(false);
  const [linkType, setLinkType] = useState<SendFormType>(undefined);
  const [token, setToken] = useState<Token>(undefined);
  const [uuid, setUuid] = useState<string>(undefined);

  const handleSaveToClipboard = useCallback(() => {
    const link = `${location.origin}/send/${uuid || token?.toEncryptedString() || ``}`;
    setBuffWriting(true);
    navigator.clipboard.writeText(link).then(() => {
      setTimeout(() => {
        setBuffWriting(false);
      }, 500);
    });
  }, [token, uuid]);

  const handleSend = useCallback(() => {
    const link = `/send/${uuid || token?.toEncryptedString() || ``}`;
    history.push(link);
  }, [history, token, uuid]);

  const handleSendNewWindow = useCallback(() => {
    const link = `${location.origin}/send/${uuid || token?.toEncryptedString() || ``}`;
    window.open(link, `_blank`);
  }, [token, uuid]);

  const handleAddToFavorite = useCallback(() => {
    const url = new URL(token.link);
    requestFavicon(url.protocol, url.hostname);
    addToFavorite({tokenString: token.toEncryptedString(), uuid});
  }, [addToFavorite, requestFavicon, token, uuid]);

  const handleSubmit = useCallback((linkType) => {
    switch (linkType) {
      case SendFormType.CLIPBOARD:
        handleSaveToClipboard();
        break;
      case SendFormType.SEND:
        handleSend();
        break;
      case SendFormType.SEND_NEW_WINDOW:
        handleSendNewWindow();
        break;
      case SendFormType.FAVORITE:
        handleAddToFavorite();
        break;
      default:
        console.error(`Wrong link type: ${linkType}`);
    }
  }, [handleSaveToClipboard, handleSend, handleSendNewWindow, handleAddToFavorite]);

  // Ловим изменение токена и linkType
  useEffect(() => {
    if (token && !token.shortLink) {
      handleSubmit(linkType);
    }
  }, [token, handleSubmit, linkType]);

  // Ловим появление uuid-а и linkType
  useEffect(() => {
    if (token?.shortLink && uuid) {
      handleSubmit(linkType);
    }
  }, [uuid, token, handleSubmit, linkType]);

  // Получили uuid и сохраним его в более приятном виде в state
  useEffect(() => {
    if (token?.shortLink && generatedUuids?.[token?.toEncryptedString()]?.uuid) {
      setUuid(generatedUuids?.[token?.toEncryptedString()]?.uuid);
    }
  }, [generatedUuids, token]);

  // Пришёл ответ об ошибке во время генерации UUID-a
  useEffect(() => {
    if (token?.toEncryptedString() && generatedUuids?.[token?.toEncryptedString()]) {
      if (!generatedUuids[token?.toEncryptedString()].ok) {
        // Сообщим об ошибке
        UIkit.notification(generatedUuids[token?.toEncryptedString()].error || ``, {
          pos: `bottom-right`,
          status: `danger`,
          timeout: 1500,
        });
      }
    }
  }, [token, generatedUuids]);

  return (
    <SendForm
      onSubmit={(formData) => {
        const formDataType = formData.type;
        delete formData.type;

        setLinkType(formDataType);
        const linkTypeChanged = formDataType !== linkType;

        const newToken = new Token(formData);
        const tokenChanged = !newToken.equals(token);
        const needUuid = formData.shortLink;

        // Реакт не отловит изменения => нам вызвать handleSubmit вручную
        if (!tokenChanged && !linkTypeChanged) {
          handleSubmit(formDataType);
          return;
        }

        if (!tokenChanged) {
          return;
        }

        if (needUuid) {
          setUuid(undefined);
          createUuid(newToken);
          setToken(newToken);
          return;
        }

        setToken(newToken);
        handleSubmit(formDataType);
      }}
      isBuffWriting={isBuffWriting}
    />
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MainForm);

