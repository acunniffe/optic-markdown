rm -rf ./lib

nearleyc src/grammar/optic-md-comment.ne -o src/grammar/compiled/optic-md-comment.js

babel src --out-dir lib