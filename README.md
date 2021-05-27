# Simple Note App using React Native

## Overview

This Project is simple app which display about note (list and detail), user can create a note and save it also edit.

This Project was created using latest React Native & Typescript


Project was bootstrapped with [Create React Native App](https://reactnative.dev/blog/2017/03/13/introducing-create-react-native-app)

## The goal

A simple application that has fast performance and a Friendly User Experience (My hope :D)

## Project Requirements Before Setup

-   Node (>= v12.16.1)
-   NPM (>= 6.13.4)
-   Yarn (1.22.10)
-   Typescript (>=3.8.3)

## Installing

Clone Repo (if you using github for get source)

```
git clone https://github.com/hamdankun/simple-note-app.git
```

Go To Project Directory

```
cd simple-note-app
```

install depedencies

```
yarn install
```

running app in android 

```
yarn android
```

before running app in ios, you should install pod depedencies

```
npx pod-install
```

and then, running app in ios 

```
yarn ios
```

#### File Structure

```
simple-note-app
└───src/ <-- This is where you put your app files.
|   |   components/ <-- global/common component put in here
|   |   config/ <-- some global config for app put in here
|   |   helpers/ <-- some function to use in any components put in here
|   |   libraries/ <-- some custom libraries put in here
|   |   navigation/ <-- all page in application put in here
|   |   redux/ <-- reducers, actions & store (state management) put in here
|   |   |   actions/
|   |   |   reducerSlices/ <-- our reducers put in here
|   |   |   store.ts <-- our collect reducers
|   |   theme/ <-- some global styles for any components
│
└───android/ # contain native android scripts
|
|---ios/ # contain native ios script
```

## Functionality overview

This Project just a application which display information like note

#### User Interface (UI)

To create the UI, this project uses the `JSX` technology come from ReactJS

#### State Management

for state management this project use utility library named `@reduxjs/toolkit` (official redux)
and for integration between redux and ui, this project use `react-redux`

#### HTTP Request (making request API)

for do a some request api, this project use library call as `axios`, its simple and lightweight for http client library, easy to use dan easy for custom

#### General functionality

-   Get List note
-   Create New Note
-   Edit Note
-   Dekte Note

#### The general screen breakdown looks like this:

-   `note/list`
-   `note/form`

Copyright (c) 2021, Hamdan Hanafi
