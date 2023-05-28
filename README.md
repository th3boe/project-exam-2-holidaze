![image](/src/images/Holidaze-preview-image.png)

Above is a screenshot of the venues page and profile page from a venue booking page named Holidaze made as part of my second project exam.

[![Netlify Status](https://api.netlify.com/api/v1/badges/c8158cc0-2279-40c8-b3b2-a8e6d75e4a3e/deploy-status)](https://app.netlify.com/sites/holidaze-by-boe/deploys)

## Introduction

The Holidaze page was created as the second and final project exam. The brief given was to develop brand new front end for a newly launched accommodation booking site named HOLIDAZE.

"While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues."

I did some quick research, while immidiatly having an thought about adding images that screamed dream vacation to have the website pull the target audience in, making the site intriguing yet comfortable.

Built using CSS frameworks and react JS.

## CheckList for delivery

### Delivery links

- [x] A Gantt chart for project timing
      https://trello.com/b/a5cvu6aA/holidaze/timeline
- [x] A design prototype
      https://xd.adobe.com/view/62bf8e4a-92e3-4070-8536-3de4003559e5-37ec/
- [x] A style guide
      https://xd.adobe.com/view/88281e56-75d7-4a6b-9eaa-06d5254a3685-dd7b/
- [x] A kanban project board
      https://trello.com/b/a5cvu6aA/holidaze
- [x] A repository link
      https://github.com/th3boe/project-exam-2-holidaze
- [x] A hosted application demo link
      https://holidaze-by-boe.netlify.app/

## For delivey and user testing

### The site must contain:

- [x] A user may view a list of Venues
- [x] A user may search for a specific Venue
- [x] A user may view a specific Venue page by id
- [x] A user may view a calendar with available dates for a Venue
- [x] A user with a stud.noroff.no email may register as a customer
- [x] A registered customer may create a booking at a Venue
- [x] A registered customer may view their upcoming bookings
- [x] A user with a stud.noroff.no email may register as a Venue manager
- [x] A registered Venue manager may create a Venue
- [x] A registered Venue manager may update a Venue they manage
- [x] A registered Venue manager may delete a Venue they manage
- [x] A registered Venue manager may view bookings for a Venue they manage
- [x] A registered user may login
- [x] A registered user may update their avatar
- [x] A registered user may logout

### Added features on the side:

[x] A registered Venue manager may view the venues they have created

### WCAG

The website has been WCAG checked several times during the creation process. Some of what has been checked is the color palette and that the contrast is okay for people suffering from vision impairments. Alt text has been added to images for when the page needs to be used with voiceover, for example "Siri". Labels has also been added for the inputs to make the forms easier to navigate if voiceover is needed.

This is just some of what has been checked, contrast and colors is a very important factor for a page to be useful for the average audience.

### Used Resources

We were given a list of approved resources that we had to pick from when choosing how to build the page.

The CSS frameworks used for this project are _React Bootstrap_ and _CSS modules_

For the hosting services and design applications and planning applications, I chose to use _Netlify_, _Adobe XD_ and _Trello._

## Description

### What went well on the project

For me I feel that I always fall back on the design, I find this to be a very pleasing and fun activity during every project. This time I used a design that I enjoyed looking at while working on the functionalities. During my busy work time, I still ended up with a need to travel, so for me the design did it's intended job.

I also felt that the react functionalities ended up pretty good, and it all seemed to work, I have mostly enjoyed the whole project process.

### Good to know

I did exclude most of the location values from my specific venue, but have all of them in the create venue form. This to make it possible to add in values if one would want to use the values for sorting etc. The location inputs are defaulted to empty strings.

In the specific venue however I only included address, city and country, and made it so that it would only show if the inputs had any content.

### Logo

For the logo I wished to use bright warm colors giving the target audience a warm feeling of joy. I wanted the Icon to attract the traveller within the user, giving them a need to travel the world in search for their own peace, no matter what this means for the individual user. For me the sunflower symbolizes light and summer, which is when we are most likely to travel either to the neighboring town or a country far away.

![image](/src/images/logo-desktop.png)

### Design choice

The design choice was based on a warm feeling. I firstly started researching other booking sites, as well as thinking back on my older projects. This led me to make a design choice containing a background picture. I wanted the picture to sympolize warmth and adventure. For me a beach can be all of that, you can both view the ocean in all its depths as well as relax and feel the warm sun.

When the image choice was made by testing the look in adobeXD, I started working out a color palette as well as including the logo in this process. I took some inspiration from macbooks dark mode with the see-through navigation at the top of the desktop.

I then had to take the summer/ vacation/ holiday theme and create a color palette that would be WCAG approved which you can read about above under the WCAG headline.

I had the design tested out on several different people, where I asked them for their opinion, one of whom responded with: "I was very sold by the front page, it made me want to travel and reminded me of AirBnB".

### React JS

The used react functionality has it's bases from several sources combining some of the react used in previous CA assignment and combining some code builds from JS2 with the react modules to fit the wished functionality of the Holidaze page.

React has been a very interesting chapter, giving me both better understanding of itself as well as vanilla JS, in my opion useStates has been the most intriguing new feauter when learning react for the sake of this exam.

### Built With

- [React](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
- [CSS Modules](https://github.com/th3boe/project-exam-2-holidaze/tree/main/src/pages)

## Getting Started

### Installing

The project repository can be cloned using this link:

```bash
git clone https://github.com/th3boe/project-exam-2-holidaze.git
```

Which you can open using Visual Studio Code or another code editor.

The repository has some connected dependencies which can be accessed using terminal:

Install:

```bash
npm i
```

Run build and live-server:

```bash
npm run start
```

This website was built using react. Information can be found about this in the package.json file that is in the project file.

The API was given by the school and the information about how and what to call for the functionalities to work can be found in the below documentation:

https://docs.noroff.dev/holidaze/authentication

### Contributing

If someone would want to help with the project or collaborate on it, they could fork the repo, which could later be merged. But since this is an project exam, it is not open for contribution.

### Contact

If you want to get in contact with me (the developer), you can look me up on my animation portfolio or Linkedin page.

[My Animation Portfolio](www.boe3am.com)

[My LinkedIn page](https://www.linkedin.com/in/benedicte-%C3%B8verb%C3%B8-9b35b2162/)

## References

During this project I have mostly written code based on the react CA which was again based on the react modules. I've also gathered inspiration from pages like AirBnB, and used my old projects.

The website contains react bootstrap code for the navbar and carousel etc.
