const isDev = location.hostname.includes(`localhost`);

export const SERVER_BASE = (isDev) ? `https://localhost:3000/api/v1` : `https://get2p.herokuapp.com/api/v1`;

export const APPLICATION_NAME = `GET2POST`;
export const MAIN_DESCRIPTION = `
Get2p позволяет сконструировать запрос на любой интересующий вас сайт. 
Пример использования: автологин в свой аккаунт без необходимости ручного 
ввода пароля и кликов на кнопки. Для использования необходимо базовое 
понимание запросов. Больше информации - в справке.
`;
export const HELP_DESCRIPTION = `
Воспользуйтесь формой, чтобы сформировать запрос. Вам нужно, как минимум, 
указать ссылку. Так же вы можете уточнить метод, хедеры, тело запроса и т.д.
`;