/* IMPORT COMPONENTS */
import PageNotFound from '../components/02_pages/PageNotFound';
import Homepage from '../components/02_pages/Home';
import About from '../components/02_pages/About';
import Archive from '../components/02_pages/Archive';
import Single from '../components/02_pages/Single';


/* IMPORT TRANSITIONS */
import TransitionHomepage from '../utils/pageTransitions/TransitionHomepage.js';
import TransitionAbout from '../utils/pageTransitions/TransitionAbout.js';


const routes = [
    { exact: true, path: '/', component: Homepage, datas: {navigationItem:'Accueil', isArchive: false, bodyClass:'home', transition: { matching: '/', animation: TransitionHomepage}}},
    { exact: true, path: '/about', component: About, datas: {navigationItem:'About', isArchive: false, bodyClass:'about', transition: { matching: '/about', animation: TransitionAbout}}},
    { exact: true, path: '/works', component: Archive, datas: {navigationItem:'Works', isArchive: true, bodyClass:'archive', transition: { matching: '/works', animation: ""}}},
    { exact: true, path: '/works/:id', component: Single, datas: {isArchive: false, bodyClass:'single', transition: { matching: '/works', animation: ""}}},
    { exact: false, path: '/*', component: PageNotFound, datas: {isArchive: false, bodyClass:'404', transition: { matching: null, animation: ""}}}
];

export default routes;
