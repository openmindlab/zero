const Path = require("path");
const Generator = require('yeoman-generator');

class Zero extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('destination_folder', { type: String, required: true, desc: "Folder which create files into" });

    this.option('skip_folder', {desc: "Do not create the folder for plugin", type: Boolean, alias: 'sf', default: false});
    this.option('skip_pug',    {desc: "Do not create the .pug file for plugin", type: Boolean, alias: 'sp', default: false});
    this.option('skip_css',    {desc: "Do not create the .scss file for plugin", type: Boolean, alias: 'sc', default: false});
    this.option('skip_readme', {desc: "Do not create the README.md file for plugin", type: Boolean, alias: 'sr', default: false});

    this.log("Using destination folder", this.options.destination_folder);

  }

  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'pl_name',
        message : 'Name of the Zero plugin'
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {

    let dest_folder = [this.options.destination_folder];
    if ( this.options.skip_folder === false ) {
      dest_folder.push( this.answers.pl_name );
    }

    let folder = this.destinationPath( Path.join.apply(Path, dest_folder ) );



    if ( this.options.skip_pug === false ) {
      this.fs.copyTpl(
        this.templatePath('index.pug'),
        this.destinationPath(`${folder}/index.pug`),
        { name: this.answers.pl_name }
      );
    }

    if ( this.options.skip_css === false ) {
      this.fs.copyTpl(
        this.templatePath('style.scss'),
        this.destinationPath(`${folder}/style.scss`),
        { name: this.answers.pl_name }
      );
    }

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${folder}/${this.options.skip_folder ? this.answers.pl_name.toLowerCase() : 'index'}.js`),
      { name: this.answers.pl_name }
    );

    if ( this.options.skip_readme === false ) {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath(`${folder}/README.md`),
        { name: this.answers.pl_name }
      );
    }

  }

};


module.exports = Zero;
