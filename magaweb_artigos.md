javascript: modularização de scriptas com export e import

Para melhor entendimento e organização de um código de programação o uso de módulos independentes interligados é uma das melhores técnicas já inventadas, em qualquer linguagem. E em javascript temos o comando export e import para essa funcionalidade funcionando das seguintes formas:

export:

Existem 2 tipos de export, o default e o nominal

//file test.js
const a = 10 //nominal
const b = 20
const c = 30
export default a
export {b, c}


//em outro arquivo qualquer
import m, {b, c} from "./test.js"

// 'm' (sem colchete) trará o valor de 'a' por ele, lá na exportação, ter sido exportado por default e assim pode ser importado com qualquer nome
// {b, c} trarão as constantes b e c que foram exportadas nominalmente no outro arquivo