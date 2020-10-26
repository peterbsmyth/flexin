# Flexin

The application for bodyweight strength training.

## Terminology

**Program:** A program is the highest-level of organization for exercising. It organizes a training program of detailed, week-by-week, strength training exercises for a period of 6 weeks.
**Week:** A week organizes a program further. It is not necessarily a calendar week or a 7-day week. It can be either of those, it is always inclusive of 4 sessions. Athletes may choose to exercise on a cadence of 2 days on, 2 days rest, 2 days on, 2 days rest and that makes an 8-day week.
**Session:** A session is roughly a single day's workout regime.
**SessionItem:** A session item is a prescribed exercise along with expected reps, weight, tempo, and intensity to train at.
**Exercise:** An exercise is a database entry of an exercise that specifies characteristics such as push, pull, name, and intensities.

## Developer Tools

### 1. Angular Command Line

Install [@angular/cli from npm](https://cli.angular.io/)

### 2. Redux Dev Tools

Install [Redux Dev Tools from Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### 3. Nx Console for VS Code

Download and install the VS Code extension [Nx Console from VS Code Extension Marketplace](https://nx.dev/angular/cli/console)

## Project Quickstart

### 1. Install Dependencies

```sh
npm install
```

### 2. Run the Celebrity Application

```sh
nx serve celebrity --open
```

### 3. Run the Athlete Application

```
nx serve athlete --open
```

### ngrx Follows

[Commands, Documents, Events](https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5)
