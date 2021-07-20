FROM node:16-alpine
# define environment variables
ENV HOME=/app
ENV NODE_ENV=production
ENV NODE_PORT=3000
# create application folder and assign rights to the node user
RUN mkdir -p $HOME && chown -R node:node $HOME
# set the working directory
WORKDIR $HOME
# set the active user
USER node
# copy package.json from the host
COPY --chown=node:node package.json $HOME/
# copy file from the host
COPY --chown=node:node ./ $HOME/
# install application modules
RUN npm install && npm cache clean --force
# build
RUN npm run build
# expose port on the host
EXPOSE $NODE_PORT
# application launch command
CMD [ "npm", "start" ]