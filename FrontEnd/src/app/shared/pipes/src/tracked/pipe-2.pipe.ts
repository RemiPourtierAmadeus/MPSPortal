import {Pipe, PipeTransform} from '@angular/core';
/**
 * Pipe2Pipe
 * A pipe takes in data as input and transforms it to a desired output.
 */
@Pipe({name: 'Pipe2Pipe'})
export class Pipe2Pipe implements PipeTransform {
    /**
     * Method transform.
     * This method comes from interface PipeTransform. In each pipe, we have to
     * implement it.
     */
    transform(){
        //Code your transformation here.
    }
}
