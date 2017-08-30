# rezon
Simple infrastructure for react based projects.

<article> - фичи
<section> - компоненты


для redux использ контейнеры, коннектом подключаем требуем компонент ( внутрен или внешн)

компоненты используют только "локальн" css-modules.
фичи  используют и свои "локальн" и "внешние" css

в postcss (при данных настройках webpack) импортим только переменные, иначе дублирование классов через css-modules.

echo '-w "\n"' >> ~/.curlrc


type ServerError: string | {}

"npm update"

npm outdated
rm node_modules
npm update --save-dev && npm update --save 

или

npm-check-updates
npm-check-updates -u
npm install


Flow 0.53
class ... extend React.Component --> type react.createClass // TODO: проверить на след версиях

sinon onChange на одном компоненте, с нескольк полями
const event = {target: {name: "pollName", value: "spam"}};
.simulate('change', event);

прошл месяц
from = moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
to = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');

прошл год
from = moment().subtract(1,'year').startOf('year').format('YYYY-MM-DD');
to = moment().subtract(1,'year').endOf('year').format('YYYY-MM-DD');