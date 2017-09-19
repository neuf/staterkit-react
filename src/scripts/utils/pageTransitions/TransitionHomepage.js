// Import Modules
import {TweenLite} from 'gsap';


// Import Emitter
import Emitter from '../../core/Emitter';
import {
    PAGEANIMATED,
  } from '../../config/messages';

const TransitionHomepage = {
    

    // Component Homepage Will Appear
    componentWillAppear : (callback) => {

        console.log(PAGEANIMATED);

        // Get current animated_page element
        const el = document.querySelectorAll('.animated_page')[0];
        
        // Do transition at appear
        TweenLite.fromTo(el, 2, {
            x: -200
        }, {
            x: 0,
            onComplete: () => {
                callback();
            }
        });
        
    },

    // Do transition between pages from Homepage
    componentWillEnter : (callback) => {

        // Get current animated_page element
        const el = document.querySelectorAll('.animated_page')[0];

        // Set Animate
        TweenLite.set(el, {autoAlpha: 0, x: -200});

        // Function Animate
        const animate = () => {
            
            // Get element to animate
            const homepage = el.querySelector('.homepage');

            console.log('%cJe WTF pour entrer', 'color: green');  

            // Do transition at appear
            TweenLite.to(el, 2,{
                x: 0,
                autoAlpha: 1,                
                onComplete: () => {
                    Emitter.off(PAGEANIMATED, animate);
                    callback();
                }
            });


        }
       
        // EMITER ON
        Emitter.on(PAGEANIMATED, animate);
        
    },


    // Do transition between pages from Homepage
    componentWillLeave : (callback) => {
        console.log('%cJe WTF pour partir', 'color: green'); 
        const el = document.querySelectorAll('.animated_page')[1];
        el.classList.add('is-animated');  
        TweenMax.to(el, 1, {
            autoAlpha: 0,
            y: 100,
            onComplete: () => {
                Emitter.emit(PAGEANIMATED);
                el.classList.remove('is-animated');                                
                callback();
            }
        })      
    }

}

export default TransitionHomepage;