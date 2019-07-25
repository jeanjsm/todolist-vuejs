export default class FormatterUtil {

    static formatDate(dateRef: string) {
        let dateConverted = new Date(dateRef);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
        return dateConverted.toLocaleDateString('pt-BR', options);
    }

}