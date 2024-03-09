# City Library website (Frontend)

## Architecture

The website is stored in a private S3 bucket and distributed by Cloudfront.

## CI/CD

Every push to the main branch is followed by a deployment to S3 and Cloudfront cache invalidation

## JSON forms

The InputForm component generates form inputs based on input definitions supplied to it as a prop.
The component allows for many input types, including selects, that can optionally read data from external sources.

## JSON tables

The GenericTable and GenericTableComplete components allow for generating entire user/admin preview & control tables, reading and modifying data from external sources.
