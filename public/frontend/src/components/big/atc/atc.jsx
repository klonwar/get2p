import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {favoriteSelector, responseCodeSelector, responseMessageSelector} from "#src/js/redux/selectors";
import PropTypes from "prop-types";
import {SendActions} from "#src/js/redux/reducers/slices/send-slice";
import {faviconsSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import CAicon from "#src/icons/ca.jpg";
import SpinnerWrapper from "#components/medium/spinner-wrapper/spinner-wrapper";

const ATC = (props) => {
  let redir = true;

  const cs = (new URLSearchParams(location.search)).get(`case`);
  switch (cs) {
    case `brandshop`:
      (async () => {
        const pid = (new URLSearchParams(location.search)).get(`pid`);
        const poi = (new URLSearchParams(location.search)).get(`poi`);
        const povi = (new URLSearchParams(location.search)).get(`povi`);
        const ovi = (new URLSearchParams(location.search)).get(`ovi`);

        if (pid && poi && povi && ovi) {
          await fetch(`https://brandshop.ru/index.php?route=checkout/cart/add`, {
            'credentials': `include`,
            'headers': {
              'accept': `application/json, text/javascript, */*; q=0.01`,
              'accept-language': `en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7`,
              'content-type': `application/x-www-form-urlencoded; charset=UTF-8`,
              'sec-fetch-dest': `empty`,
              'sec-fetch-mode': `cors`,
              'sec-fetch-site': `same-origin`,
              'x-requested-with': `XMLHttpRequest`
            },
            'body': `quantity=1&product_id=${pid}&option_value_id=${ovi}&option[${poi}]=${povi}`,
            'method': `POST`,
            'mode': `no-cors`
          });
          location.assign(`https://brandshop.ru/checkout`);
        }
      })();
      break;
    case `tsum`:
      (async () => {
        const sizeId = (new URLSearchParams(location.search)).get(`size_id`);
        if (sizeId) {
          await fetch(`https://api.tsum.ru/cart/item`, {
            'credentials': `include`,
            'headers': {
              'accept': `application/json, text/javascript, */*; q=0.01`,
              'accept-language': `en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7`,
              'content-type': `application/x-www-form-urlencoded; charset=UTF-8`,
              'sec-fetch-dest': `empty`,
              'sec-fetch-mode': `cors`,
              'sec-fetch-site': `same-origin`,
              'x-requested-with': `XMLHttpRequest`
            },
            'body': `type=sku&id=${sizeId}`,
            'method': `POST`,
            'mode': `no-cors`
          });
          location.assign(`https://www.tsum.ru/checkout/`);
        }
      })();
      break;
    case `belief`:
      (async () => {
        const sizeId = (new URLSearchParams(location.search)).get(`variant_id`);
        if (sizeId) {
          await fetch(`https://beliefmoscow.com/cart_items.json`, {
            credentials: `include`,
            headers: {
              "accept": `application/json, text/javascript, */*; q=0.01`,
              "accept-language": `en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7`,
              "content-type": `application/x-www-form-urlencoded; charset=UTF-8`,
              "sec-fetch-dest": `empty`,
              "sec-fetch-mode": `cors`,
              "sec-fetch-site": `same-origin`,
              "x-requested-with": `XMLHttpRequest`
            },
            body: `variant_id=${sizeId}&quantity=1`,
            method: `POST`,
            mode: `no-cors`
          });
          location.assign(`https://beliefmoscow.com/new_order`);
        }
      })();
      break;
    case `streetbeat`:
      (async () => {
        const pid = (new URLSearchParams(location.search)).get(`productid`);
        const sid = (new URLSearchParams(location.search)).get(`sizeid`);

        if (pid && sid) {
          await fetch(`https://street-beat.ru/local/components/multisite/order/ajax.php`, {
            credentials: `include`,
            headers: {
              "accept": `application/json, text/javascript, */*; q=0.01`,
              "accept-language": `en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7`,
              "content-type": `application/x-www-form-urlencoded; charset=UTF-8`,
              "sec-fetch-dest": `empty`,
              "sec-fetch-mode": `cors`,
              "sec-fetch-site": `same-origin`,
              "x-requested-with": `XMLHttpRequest`
            },
            body: `action=add&id=${sid}&count=1&isDeltaQty=1&properties%5BSIZE_TYPE%5D=tab_rus&skuCode=${sid}&code=${pid}`,
            method: `POST`,
            mode: `no-cors`
          });
          location.assign(`https://street-beat.ru/order/cart/`);
        }
      })();
      break;
    default:
      redir = false;
      break;
  }

  return (
    <div className={`uk-height-1-1 uk-flex uk-flex-center`}>
      <SpinnerWrapper loading={redir} ratio={4}>
        <img src={CAicon} />
      </SpinnerWrapper>
    </div>
  );
};

ATC.propTypes = {
  favicons: PropTypes.object,
  favorite: PropTypes.object,
  code: PropTypes.number,
  message: PropTypes.string,
  sendRequest: PropTypes.func.isRequired,
  clearResponse: PropTypes.func.isRequired,
  favoriteFromStorage: PropTypes.func.isRequired,
  getFavicon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  code: responseCodeSelector(state),
  message: responseMessageSelector(state),
  favicons: faviconsSelector(state),
  favorite: favoriteSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (data) => dispatch(Operations.sendRequest(data)),
  clearResponse: () => dispatch(SendActions.clearResponse(undefined)),
  getFavicon: (protocol, domainUrl) => dispatch(Operations.getFavicon({protocol, domainUrl})),
  favoriteFromStorage: () => dispatch(FavoriteActions.favoriteFromStorage(undefined)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ATC);
