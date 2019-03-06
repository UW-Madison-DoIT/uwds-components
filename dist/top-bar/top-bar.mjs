var tpl = "<style> :host([hidden]) {\n        display: none;\n    }\n\n    #uwds-top-bar {\n        position: -webkit-sticky;\n        position: sticky;\n        top: 0;\n        background: var(--uwds-top-bar-bg, #c5050c);\n        color: var(--uwds-top-bar-color, #f7f7f7);\n        font-family: var(--uwds-top-bar-font, 'Roboto', Arial, sans-serif);\n        font-size: 14px;\n        font-weight: var(--uwds-top-bar-font-weight, 400);\n        -webkit-font-smoothing: antialiased;\n        z-index: var(--uwds-top-bar-depth, 80);\n        width: 100%;\n        height: 4rem;\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        padding: 0 1rem;\n        margin: 0;\n        transition: box-shadow 0.3s ease-in-out;\n    }\n\n    #uwds-top-bar.shadow {\n        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n    }\n\n    #uwds-top-bar .region {\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-grid-row-align: center;\n        align-items: center;\n        -webkit-align-content: center;\n        align-content: center;\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n    }\n\n    #region__left, \n    #region__right {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1 1 30%;\n        flex: 1 1 30%;\n        box-sizing: border-box;\n        max-width: 30%;\n    }\n\n    #uwds-top-bar #region__right {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n    }\n\n    #slot__navigation,\n    #slot__help,\n    #slot__notifications,\n    #slot__profile {\n        margin: 0;\n    }\n\n    #uwds-top-bar #region__center {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        flex: auto;\n        margin: 0 1.5rem;\n        -webkit-justify-content: center;\n        justify-content: center;\n    }\n\n    #title {\n        height: 100%;\n        display: flex;\n        align-items: center;\n        margin-left: 0.5rem;\n    }\n\n    #uwds-top-bar__title {\n        font-size: 1.1rem;\n        font-weight: 400;\n        margin: 0 auto;\n    }\n\n    #uwds-top-bar__title #themeText {\n        font-weight: var(--theme-name-font-weight, 600);\n    }\n\n    #uwds-top-bar__title a {\n        text-decoration: none;\n        color: inherit;\n    }\n\n    #uwds-top-bar__title a:hover,\n    #uwds-top-bar__title a:visited, {\n            text-decoration: none;\n            cursor: pointer;\n            color: inherit;\n    }\n    @media (max-width: 600px) {\n        #uwds-top-bar #region__left {\n            flex: auto;\n            max-width: none;\n        }\n        #uwds-top-bar #region__right {\n            flex: 0;\n            max-width: 50%;\n            justify-content: flex-end;\n        }\n    } </style> <header id=\"uwds-top-bar\" class=\"uwds-top-bar\"> <div class=\"region\" id=\"region__left\"> <div class=\"slot\" id=\"slot__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <div id=\"title\"> <h1 id=\"uwds-top-bar__title\"></h1> </div> </div> <div class=\"region\" id=\"region__right\"> <div class=\"slot\" id=\"slot__help\"> <slot id=\"help-slot\" name=\"uwds-help\"> </div> <div class=\"slot\" id=\"slot__notifications\"> <slot id=\"notifications-slot\" name=\"uwds-notifications\"> </div> <div class=\"slot\" id=\"slot__profile\"> <slot id=\"profile-slot\" name=\"uwds-profile\"> </div> </div> </header> ";

class UWDSTopBar extends HTMLElement {

    constructor() {
        super();

        // Create a shadowroot for this element
        this.attachShadow({mode: 'open'});

        // Append the custom HTML to the shadowroot
        this.shadowRoot.appendChild(UWDSTopBar.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [];
    }

    /**
    *   When component is first attached to the DOM,
    *   get its defined attributes and listen for
    *   scrolling
    */
    connectedCallback() {
        // Fall back on "theme-url" to support older implementations
        this['app-url']     = this.getAttribute('app-url') || this.getAttribute('theme-url');
        this['app-name']    = this.getAttribute('app-name') || 'Hello World';
        this['theme-name']  = this.getAttribute('theme-name');

        // Set the title on initial load
        this.updateTitle();

        // Attach scroll listener
        window.addEventListener('scroll', e => {
            if (window.scrollY !== 0) {
                this.shadowRoot.getElementById('uwds-top-bar').classList.add('shadow');
            } else {
                this.shadowRoot.getElementById('uwds-top-bar').classList.remove('shadow');
            }
        });
    }

    /**
    *   Clean up event listeners if element is removed from the DOM
    */
    disconnectedCallback() {
        window.removeEventListener('scroll', e => {
            this.shadowRoot.getElementById('uwds-top-bar').classList.remove('shadow');
        });
    }

    /**
     * Remove existing child node and replace it with newly-built title HTML
     */
    updateTitle() {
        var appBarTitle = this.shadowRoot.getElementById('uwds-top-bar__title');
        if (appBarTitle.childNodes[0]) {
            appBarTitle.replaceChild(this.buildTitle(), appBarTitle.childNodes[0]);    
        } else {
            appBarTitle.appendChild(this.buildTitle());
        }
    }

    /**
    *   Create the title HTML element based on
    *   which properties exist.
    *   @return {HTMLElement} title An HTML element to use within the app bar title slot
    */
    buildTitle() {
        var title = HTMLElement;

        // Create element for theme name text
        var themeText = document.createElement('span');
        themeText.setAttribute('id', 'themeText');
        themeText.innerText = this['theme-name'] ? this['theme-name'] + ' ' : '';

        // Create element for app name text
        var appText = document.createElement('span');
        appText.setAttribute('id', 'appText');
        appText.innerText = this['app-name'] ? this['app-name'] : '';

        // Create containing element depending on whether url is present
        if (this['app-url'] && this['app-url'] !== null) {
            title = document.createElement('a');
            title.setAttribute('target', '_self');
            title.setAttribute('href', this['app-url']);
        } else {
            title = document.createElement('div');
            title.setAttribute('tabindex', '0');
        }

        title.appendChild(themeText);
        title.appendChild(appText);

        return title;
    }
}

UWDSTopBar.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('uwds-top-bar', UWDSTopBar);

export { UWDSTopBar };
