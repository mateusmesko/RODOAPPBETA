export default class Payment {
    constructor(valuePayment, 
        statusPayment, 
        termsPayment, 
        installmentsPayment, 
        valueInstallmentsPayment, 
        observationPayment) {

        this.valuePayment = valuePayment
        this.statusPayment = statusPayment
        this.termsPayment = termsPayment
        this.installmentsPayment = installmentsPayment
        this.valueInstallmentsPayment = valueInstallmentsPayment
        this.observationPayment = observationPayment
    }
}