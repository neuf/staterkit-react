// Import routes
import routes from "../../config/routes";

// Import Emitter
import Emitter from '../../core/Emitter';
import {
  PAGEANIMATED,
} from '../../config/messages';

export default class pageTransition {

  constructor() {
    this.animation = null;
  }

  start(hookState, location, callback) {
    this.hookState = hookState || null;
    this.location = location || null;
    this.callback = callback || null;
    this.animation = null;
    this.bodyClass = "";

    if(this.hookState && this.location && this.callback){
      this.selectPageTransition();
    }
  }

  selectPageTransition(){

    let matchingRoutesArr = [];
    let transitionMatching = null;
    let locationMatch = this.location.split("/").filter(function(entry) { return entry.trim() != ''; })[0];


    routes.map((r) => {
      if (r.datas.transition.matching) {
        let transitionMatch = r.datas.transition.matching.split("/").filter(function(entry) { return entry.trim() != ''; })[0];
        if (this.location != "/" && r.path != "/" && locationMatch === transitionMatch && !this.animation) {

          matchingRoutesArr.push(r);
          transitionMatching = r.datas.transition.matching;

        } else if (this.location === "/" && r.path === "/" && !this.animation && !this.transition) {
          this.transition = r.datas.transition.animation;

          if (r.datas.bodyClass) {
            this.bodyClass = r.datas.bodyClass;
          }
        }
      }
    });


    if (matchingRoutesArr.length > 1) {
      let isArchive = this.isArchiveUrl(this.location, transitionMatching);

      let matchingRoute = matchingRoutesArr.filter((el) => {
        return el.datas.isArchive === isArchive;
      });
      
      if (matchingRoute[0].datas.transition.animation) {
        this.transition = matchingRoute[0].datas.transition.animation;
      }
      if (matchingRoute[0].datas.bodyClass) {
        this.bodyClass = matchingRoute[0].datas.bodyClass;
      }

    } else if (matchingRoutesArr.length) {
        if(matchingRoutesArr[0].datas.transition.animation) {
          this.transition = matchingRoutesArr[0].datas.transition.animation;
        }
        if (matchingRoutesArr[0].datas.bodyClass) {
          this.bodyClass = matchingRoutesArr[0].datas.bodyClass;
        }
    }


    /*If therea are a bodyclass */
    if (this.hookState != "componentWillLeave" && this.bodyClass) {
      let $body = document.querySelector('body');
      $body.setAttribute('class', '');
      $body.classList.add(this.bodyClass);
    }


    /* If there are a transition */
    if (this.transition) {
      this.startAnimation();
    }else{
      /* If there is not a transition on leave just emit PAGEANIMATED*/
      if ( this.hookState === "componentWillLeave") {
        Emitter.emit(PAGEANIMATED);
      }
      this.callback();
    }
  }



  isArchiveUrl(_path, _matching) {
    let originURL = 'http://0.0.0.0:8080';
    let currentURL = originURL + _path;

    let urlToCheck = originURL + _matching;

    let regex = new RegExp(`${urlToCheck}/{1}[a-zA-Z0-9]{1,}`, 'i');

    if(currentURL.match(regex)){
      return false
    }
    else {
      return true
    }
  }





  startAnimation() {

    switch(this.hookState) {
      case "componentWillAppear": {
        console.log("componentWillAppear");
        this.transition.componentWillAppear(this.callback);        
        break;
      }
      case "componentWillEnter": {
        console.log("componentWillEnter");
        this.transition.componentWillEnter(this.callback);        
        break;
      }
      case "componentWillLeave": {
        console.log("componentWillLeave");
        this.transition.componentWillLeave(this.callback);        
        break;
      }
      default : {
        this.callback();
      }
    }
  }

};

