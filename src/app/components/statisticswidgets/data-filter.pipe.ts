import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
import { ExportService } from './export.service';

@Pipe({
    name: 'dataFilter',
    pure: false
})
export class DataFilterPipe implements PipeTransform {
    constructor(public exportTo: ExportService) {

    }
    transform(array: any[], query: string): any {
        if (query) {
            try {
                this.exportTo.exportData = _.filter(array, row => row.schoolname.indexOf(query) > -1);

                return _.filter(array, row => row.schoolname.indexOf(query) > -1);
            } catch (e) {
                console.log(query)
            }
        }
        return array;
    }
}
