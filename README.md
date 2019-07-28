# ScrimsRL

## Compile

`tsc -p tsconfig.json`

## Run

* `cd dist`
* `node .`

# Roles

## @Admin

### Admin commands

* !update
* !ranking
* !enable [command]
* !disable [command]

## @Moderator

### Moderator commands

* !clear

## @Captain

### Captain commands

* !scrim
* !leave
* !join [team]
* !status
* !help

## @Player

## @User

### User Commands

* !info [team]


# Channels

## Register Team
Enviar a @Admin

[TAG] (Nombre del equipo)

C (Nombre del jugador) [platform] [id] @discordTag
P (Nombre del jugador) [platform] [id] @discordTag
P (Nombre del jugador) [platform] [id] @discordTag

## Find a Scrim

Commands:

!scrim => pone un aviso de buscando scrim (timeout 1 hora)
!leave => saca el aviso de buscando scrim
!join [TEAM] => manda un dm al capitan de TEAM
!status
!help

## Ranking

- Usando los perfiles de steam de los jugadores se calcula el MMR promedio de cada equipo
- Se arma una tabla que se actualiza preiodicamente