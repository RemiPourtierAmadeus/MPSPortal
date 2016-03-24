import * as gulp from 'gulp';
import {getBrowserSync} from '../browsersync';
import * as historyApiFallBack from 'connect-history-api-fallback';

let bs = getBrowserSync();

/**
 * This function initiates the server.
 */
function init(){
    bs.init({
        server : {
            baseDir : './dist',
            routes: {
                "/node_modules": "node_modules"
            }
        },
        middleware: [historyApiFallBack()]
    });
}

///////////////////// Copy Tasks /////////////////////

gulp.task('server:init', init);