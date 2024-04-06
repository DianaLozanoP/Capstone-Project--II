### Project Proposal 
Step Two is all about fleshing out your project idea. For this step, please write a proposal based on the project idea you agreed on with your mentor. This proposal should be a 1-2 page document that answers the following questions:

1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project. <br>
I will use React and Node for this project because I want to apply all the knowledge that I acquired at the end of the course. Also, using JavaScript for both back-end and front-end is easier in terms of syntax. 
2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? <br>
I think it would be more focus on the back-end, but I want to try to make it evenly. In my last capstone project, I did not put that much effort into the front-end. It is important for users to have a well developed UI. 
3. Will this be a website? A mobile app? Something else? <br>
This will be a website for now. The project has the potential to become a software.
4. What goal will your project be designed to achieve? <br>
The goal of this project is to create an easy tool for scientist to document their experiments. I have noticed in the lab where I work that sometimes paper work just takes longer than the experiment itself, and a lot of parts of the documentation process could be more automated. 
5. What kind of users will visit your app? In other words, what is the demographic of your users? <br>
The users that will visit my app are laboratory workers who are looking to document their tests efficiently and securely. 
6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. <br>
I'm planning to create my own database. It would be fake information about media, reagents, lab equipment, laboratory methods. In general, it is gonna support the documentation proccess, it will allow the analyst to complete their lab notes faster.  
7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: <br>

a. What does your database schema look like?<br>
Database schema will include multiple tables such as Users Table, Media Table, Reagents Table, Equipment Table, Incubators Table, Procedures Table. <br>

b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. <br>
Since I will be creating my own database, I'm not sure what kind of problems I will be encountering. Maybe not being able to link data properly. <br>

c. Is there any sensitive information you need to secure?<br>
Yes, data results are highly sensitive. Data should only be open for certain users. However, in this case I want users to be able to interact with all features of the app, so I will not enforce the same security as the app should have in a real life case scenario.<br>

d. What functionality will your app include? <br>
The main functionality is the notes parts, it will include:

    - Sample information. 
    - Sample description.
    - Drop down to add equipments IDs.
    - Drop down to add media lot codes and expiration dates.
    - Results.
    -Reviewed by.

e. What will the user flow look like? <br>

Users will create a profile, then they can have different access depending on their permissions. They might be able to add new methods, new equipment, new media. Also the main feature to write down laboratory notes about their daily experiments.

f. What features make your site more than a CRUD app? What are your stretch goals? <br>
- User authentication and authorization. 
- Search option to look for certain methods in the database.
- Data visualization.


