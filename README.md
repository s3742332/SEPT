# RMIT SEPT 2021 Major Project

# Group Day-Time

## Members
Tessa Podbury s3775931 <br />
Mazda Shahzadi s3841929 <br />
Harris Charalambous s3742332 <br />
Danny Pham s3719046 <br />
Clinton Thai s3840992 <br />

## Records

* Github repository : https://github.com/s3742332/SEPT 
* jira Board : https://sept.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=SEPT
* Google Docs : https://drive.google.com/xxxx

## File Structure
Admin Docs: holds information regarding team member roles and administration information <br />
Sprint 0/1: contains product backlog, sprint planning, user stories <br />
  

To run the application locally: 
1) cd into each and every microservice (ms_booking, ms_availability, ms_profiles, ms_service) and run :
2) ./mvnw package && java -jar target/ms_[microservice]-0.0.1-SNAPSHOT.jar
3) cd into FrontEnd/myfirstapp
4) run "npm install"
5) run "npm start"

Deploy to production server:
**Confirm that CircleCI is linked to this repo, and that AWS services are online (RDS, EC2, S3).
**Ensure that CircleCI has environmental variables in project settings. 
**DOCKERHUB_USERNAME, DOCKERHUB_PASSWORD, EC2_URL, RDS_URL, RDS_USERNAME, RDS_PASSWORD, S3_REGION, S3_ACCESS_KEY, S3_NAME, S3_SECRET_KEY
**Ensure that CircleCI has SSH keys for the AWS EC2 instance in project settings.
*Deployment only works on the main branch
1) Deploy code changes to your branch (tests will be run)
2) Merge to development branch (tests will be run)
3) Merge to main branch (tests will be run, and deployment)
4) CircleCI will run a job that requires approval, once approved, the docker-compose build will build the image and push to dockerhub. and the aws server will pull the new images and recreate the containers.



