export default class Product {
    constructor(id, 
        codeProduct,//codigo
        nameProduct,//nome do produto
        amontProduct,// quantidade do produto solicitada
     
        discountProduct, //disconto do produto
        valueProduct, //valor do produto
        observationProduct, //obervação do produto
        suggestionProduct, // suggestion product
        reasonProduct, // motivo da solicitação
        
        dataShipDateProduct, //data de entrega do produto
        amontShipedProduct,// quantidade do produto solicitada
        statusShipProduct,//status de entrega do produto
        valueShipProduct) { 
        

        this.id = id,
        this.codeProduct = codeProduct,
        this.nameProduct = nameProduct,
        this.amontProduct = amontProduct,
        this.amontShipedProduct = amontShipedProduct
        this.discountProduct = discountProduct
        this.valueProduct = valueProduct,
        this.observationProduct = observationProduct,
        this.suggestionProduct = suggestionProduct,
        this.suggestionProduct = suggestionProduct,
        this.reasonProduct = reasonProduct,
        this.dataShipDateProduct = dataShipDateProduct,
        this.statusShipProduct = statusShipProduct,
        this.valueShipProduct = valueShipProduct
    }
}