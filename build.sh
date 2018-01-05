rm -rf ./lib

nearleyc src/parser/grammar/optic-md-comment.ne -o src/parser/grammar/compiled/optic-md-comment.js

babel src --out-dir lib