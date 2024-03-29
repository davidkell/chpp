# Companies House ++

![Companies House ++ preview](assets/screenshot.png "Companies House ++ preview")

Chrome plugin to inject the company ownership hierarchy into a Companies House page.

Under the hood, it uses the [Companies House API](https://developer.company-information.service.gov.uk/api/docs/) to recursively fetch people of significant control (PSCs), and then search for corporate PSCs in the search API.

This project is on the [react-typescript-chrome-extension-boilerplate](https://github.com/sivertschou/react-typescript-chrome-extension-boilerplate.git), with inspiration on using [React in content-scripts](https://github.com/yosevu/react-content-script) and [hot-reloading](https://github.com/xpl/crx-hotreload).

## Getting started

Navigate to the project directory and install the dependencies.

```
$ yarn
```

To build the extension, and rebuild it when the files are changed, run

```
$ yarn start
```

After the project has been built, a directory named `dist` has been created. You have to add this directory to your Chrome browser:

1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable _Developer mode_.
4. Click _Load unpacked_.
5. Select the `dist` directory.
