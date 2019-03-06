import tpl from './top-bar.html';

export class UWDSTopBar extends HTMLElement {

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
