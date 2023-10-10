# SheetToHTML
HTML templates that link to Google Sheets; useful for slapping data onto a HTML layout.

In theory, everything's done for you - templates ready to use, you just put your Google Sheet API key in and then use URL parameters to setup 

# Installation

1. Download this repository as a .zip and extract somewhere.
1. Open '/common/creds.js' and insert your Google Sheets API Key (see instructions below if you don't have one)

# Google Sheets API key
SheetToHTML uses the Google Sheets v4 API; unlike previous version of the API, this one requires the use of an API key that you have to generate using Google's developer console.
To do this, you can either create a project and then enable the Google Sheets API on that project _or_ search for the API and enable it (which will automatically create you a project).

1. Go to https://console.developers.google.com/
1. Create a new project; this can be done in multiple ways but here's one:
    1. In the upper left 'Select a project' drop down, open it up and use 'New Project'
    1. Give it a name (`SheetToHTML-integration` ?) and create it (this may take a moment)
1. In the top-middle search bar, search for 'Google Sheets API', navigate to that and press the 'Enable' button, then go back to your project
1. Navigate through 'Credentials' in the left-side menu, click 'Create Credentials' at the top and choose 'API key'

It should now display an API key for you to then use in your application! It's important to keep this secure, so whenever sharing configs, ensure you remove your apiKey.
It is advised to then 'restrict' that key to the sheets API - can do that through the key's settings easily at any time.

# Usage

SheetToHTML uses a central controller file, in combination with pairs of js and css files as templates, and very specific layouts that must be used in your Google Sheet for the templates to work.
The controller can then be used as a browser source, using the `file://` protocol, and providing URL parameters to customise where the template draws data from and how it displays.

You can find a full Google Sheet of (copy-paste'able) example data templates here: https://docs.google.com/spreadsheets/d/1oyCe0dcpL5-Lg1SCwJRIePqITLxJAf29VZ-VXx-v5Mc/edit#gid=0

## Parameters
- “id” = Spreadsheet ID, e.g. `1oyCe0dcpL5-Lg1SCwJRIePqITLxJAf29VZ-VXx-v5Mc`
- “tab” = Tab name, e.g. `GroupA`
- “imgCell” = Cell reference that contains background image URL - e.g. `&imgCell=B20`
    - Example image URL (found in B20): `https://i.imgur.com/qV15iF4.png`
- “font” = Google Font name from https://fonts.google.com/ - e.g. `&font=Young%20Serif`
- “color” = (optional) text color, hex without # - e.g. `&color=FF0000` (red)
- “template” = Folder name - e.g. `&template=bracket-8player`
- “update” = (optional) automatic data updating

**Note: You can use spaces in any of the names, but make sure they are replaced in the URL by** `%20`

## Modes
The program has two modes - 'remote' and 'local'.

- Remote means that the controller locally is just a shell that pulls everything from the latest version of the GitHub repo; the controller, supporting files and templates are all pulled remotely
- Local means the controller pulls from the templating files local to your machine

How to choose?
- If you're only interested in using the official templates, use the remote version, it's simpler and is likely to stay up to date
- If you want to create your own templates, use the local version, placing new templates into `./templates/` and refer to them in the same way as any other

# License

SheetToHTML is distributed under MIT license.

Bundled handlebars 4.7.8 also under MIT license - https://www.npmjs.com/package/handlebars.