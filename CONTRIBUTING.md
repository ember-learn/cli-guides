# Contributing

We would love to have your help with writing the next version of the ember-cli guides! As a work-in-progress, semi-greenfield project, it has different guidelines than other documentation projects. Once the project reaches MVP, these guidelines will change. Our target for MVP is the end of 2018.

## Ways to contribute

Developers of all knowledge and experience levels are invited to help out. Here are ways to contribute:

- Write new content
- Migrate content over from [ember-cli.com](https://ember-cli.com/). Source code is [here](https://github.com/ember-cli/ember-cli.github.io)
- Help review Pull Requests
- Add comments to Markdown files with tips, resources, and notes to help others figure out what to write

## How to get started

1. See the [Quest issue](https://github.com/ember-learn/cli-guides-source/issues/3) for a list of tasks that need help. Add a comment indicating which issue you can help with, then open an issue with the name of that task. Any Q&A for the task should go there. Contributors are encouraged to work in pairs.
2. Read through the Styleguide below
3. Open a Pull Request as soon as you'd like some feedback. This project aims to be "fast and good enough" rather than slower and perfect. Upon reaching MVP, a final pass will be made to polish content.
4. Expect at least one round of revisions based on feedback from others

If you volunteer for a section but are not able to make progress, please speak up so that others may pick up where you left off. Issues that are inactive without response for 3 weeks may be opened up to new contributors.  

## Leaving comments for other writers

This Guide is a team project! If you have an idea of the content
that should be in a particular section, some useful resources on
the topic, or even some incomplete explanations, you can add
them as comments in the markdown. This is highly encouraged! We'll strip out comments when we reach MVP.

## Styleguide


### Code Blocks

JavaScript and Handlebars files should follow the [Ember.js styleguide](https://github.com/emberjs/ember.js/blob/master/STYLEGUIDE.md).

Extending on these rules:

- Prefer arrow syntax (except for when scope matters, like computed properties. CPs should be noted that they can’t use arrow functions)
- No var. Only const and let for variable declarations
- Use brace expansion for imports, i.e. import { a, b } from @ember/somepackage and use the same name as is used in the API docs
- Links to the API docs should point to the `/release/` version

### Writing

When in doubt, test your writing in [http://www.hemingwayapp.com/](http://www.hemingwayapp.com/)

#### Tone

Write in a welcoming, approachable way. Think of how you would explain something out loud. That’s the preferred tone - conversational and readable. Short sentences are good. Remember that many developers, this is their first framework and English is not their first language.

#### Audience of beginners

The audience is a developer who knows enough to have built a simple HTML/JavaScript (or JQuery) app. Explanations should appeal to both developers who are learning Ember as their first framework, but not be useless to people who know another framework.

#### Scope

Give enough information to form the mental models and show how things are connected. Ask yourself, what does someone need to know about this to build the MVP of their first app at work? How would I explain this to a Junior Developer in their first week at my workplace? Remember that the API docs should serve as the in-depth explanations. If the API docs are insufficient, PR there.

#### First person plural voice

Avoid voice altogether whenever you can. When some voice is needed, use first person plural (“we”, “our”, “let’s”)


- Needs revision: “There is an entire ecosystem of adapters that allow our Ember app to talk to different types of servers…” 
- Better: “There is an entire ecosystem of adapters that allow our Ember app to talk to different types of servers …” 
- Best: “There is an entire ecosystem of adapters that allows Ember apps to talk to different types of servers …” 

#### Inclusive language

“They/Them” is  used in place of him/he/she/her/etc. Do not use gender in code examples. Avoid terms like “just, simply, obviously” etc.
