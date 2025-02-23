# SFRPG


This is fork of Ruby's fork of the Starfinder system definition for Foundry Virtual Tabletop.  I do hope you don't mind Ruby. you provided an excellent platform for me to fork off.


I am currently gathering a number fixes across the entire community and plan on adding any missing information as I find them. 


## Compatibility

Foundry v12. This is tested to work correctly on v12.330.

## Objectives of the fork

The official Starfinder system definition for Foundry appears to be an early alpha version. I've been finding problems with it continuously - it's extremely buggy, with large swathes of mistakes in the data and many questionable design choices.

At the time that I created this fork, the project appeared to be stagnant (it seems to be dead for months at a time, then gets a flurry of updates, then dies again). While I'm grateful for the fact that it exists, and for those who have put time into developing it over the years (THANK YOU!), I had no optimism for those issues to get fixed in any prompt amount of time. I also often have to make near-immediate fixes so that my session is actually playable, and do not have time for those fixes to be reviewed (I can't put my campaign on hold every time there's a bug, which is regularly). On top of this, I don't like to contribute directly to open-source projects, because in my experience this causes more drama than I can manage. I therefore tend to avoid this for mental health reasons.

Consequently, I elected to fork the project so that I could fix the most urgent problems myself.

Since I made this fork, the project appears to have resumed development (at least for the time being?) so the code is now outdated. When I have time, I intend to merge upstream changes in, but I'm a little busy right now, so this is a low priority for me.

### Short term objectives
* Bug fixes to the core
* Corrections to the existing content in the compendium
* Adding missing content to the compendium
* Integration of homebrew rules changes into the core (e.g. changing KAC+8 to KAC+4)
* Adding a custom weapon attack and damage roll bonus system for NPCs
* Adding hooks for my extension module, [rubicon-sfrpg](https://github.com/theleruby/rubicon-sfrpg/)

### Long term objectives
* Adding icons and artwork to most things which currently don't have any (this may end up in a private extension module to avoid copyright issues)
* Extending the system to support third-party OGL products that I own

## Current status

Development on this fork is slow. I am currently only putting in fixes required for my campaign, as I don't want to accidentally break everything and disrupt the sessions. I intend to merge upstream changes when my roleplaying group next goes on hiatus.

## Support

I don't really intend for anyone else to use this fork, and I don't plan to provide any support for it. My primary priority is just for me and my friends to play Starfinder and to have a good time. I can nevertheless be contacted via Discord (@Theleruby) if you want to discuss this fork with me.

## How to use the fork

If you really really really must adamantly use my fork instead of the official project, here's how you get it working:

* You need a Foundry-compatible version of Node.js on PATH
* Download and install version 0.26.1 of sfrpg normally
* Use your favourite git-compatible source control tool to pull down this repo
* npm install
* gulp cook
* Delete everything in systems/sfrpg and copy the files from "dist" folder into it

## Legal

* Game rules, mechanics, and the majority of the compendium content is licensed under the Open Game License version 1.0a (see "OGL" file).
* Permission to develop packages for Foundry is granted under the Limited License for Package Development (see https://foundryvtt.com/article/license/).
* Javascript, HTML and CSS code is licensed under the MIT License (see "LICENSE" file).
* Product Identity owned by Paizo (as defined under section 1(e) of the OGL) is used under the terms of the Paizo Community Use Policy, where allowed (see below). A duplicate of this policy is included in the repository (see "PAIZO-CUP" file).
* Some content may not be covered by any of the above; the use of this content is assumed to be covered under fair use and consumer protection laws.

I have kept this fork public in an endeavour to unofficially support the project. In the event of any legal complaints it will be made private.

### Paizo Community Use Policy
_This game system definition uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This game system definition is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com._

## If you like Starfinder

Please support the publishers of Starfinder and its supplementary third-party material by purchasing the game content included in this project from your favourite store (Amazon, Dungeonland, DriveThruRPG, etc).

## Other resources

* Archives of Nethys - https://www.aonsrd.com/
* Starjammer SRD - https://www.starjammersrd.com/
