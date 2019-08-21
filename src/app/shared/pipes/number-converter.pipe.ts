import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberConvertor'
})
export class NumberConvertorPipe implements PipeTransform {

    transform(value: any, type: any): any {
        if (value != "" && value != undefined && value != null) {


            var systems = {
                devanagari: 2406, tamil: 3046, kannada: 3302,
                telugu: 3174, marathi: 2406, malayalam: 3430,
                oriya: 2918, gurmukhi: 2662, nagari: 2534, gujarati: 2790
            },
                zero = 48, // char code for Arabic zero
                nine = 57, // char code for Arabic nine
                offset = (systems[type.toLowerCase()] || zero) - zero,
                output = value.toString().split(""),
                i, l = output.length, cc;

            for (i = 0; i < l; i++) {
                cc = output[i].charCodeAt(0);
                if (cc >= zero && cc <= nine) {
                    output[i] = String.fromCharCode(cc + offset);
                }
            }
            return output.join("");
            // return null;
        }
    }

}