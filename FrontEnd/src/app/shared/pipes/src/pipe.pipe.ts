import {Pipe, PipeTransform} from '@angular/core';
/**
 * PipePipe
 * A pipe takes in data as input and transforms it to a desired output.
 */
@Pipe({name: 'PipePipe'})
export class PipePipe implements PipeTransform {
    /**
     * Method transform.
     * This method comes from interface PipeTransform. In each pipe, we have to
     * implement it.
     */
    transform(){
        //Code your transformation here.
    }
}
