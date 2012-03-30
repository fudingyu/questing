var async = require('async'),
    debug = require('debug')('questing'),
    definator = require('definator'),
    out = require('out'),
    fs = require('fs'),
    path = require('path'),
    events = require('events'),
    util = require('util'),
    questing = require('../pkg/cjs/questing'),
    dataPath = path.resolve(__dirname, '../data/');
    
function QuestingWorld() {
    this.ready = false;
    
    // initialise entities
    this.entities = {};
}

util.inherits(QuestingWorld, events.EventEmitter);

QuestingWorld.prototype.load = function() {
    var world = this;
    
    // load the entities
    async.parallel([
        this._loadEntities.bind(this)
    ], function(err) {
        if (err) {
            out('!{red}{0}', err);
        }
        else {
            console.log(world.entities);
            
            world.ready = true;
            world.emit('ready');
        }
    });
    
    return this;
};

QuestingWorld.prototype._loadEntities = function(callback) {
    var world = this,
        entitiesPath = path.join(dataPath, 'entities');
    
    fs.readdir(entitiesPath, function(err, files) {
        async.forEach(
            files || [],
            function(file, itemCallback) {
                var entityClass = questing.entities[file] || questing.Entity,
                    definitionPath = path.join(entitiesPath, file);
                
                debug('attempting to load definitions from: ' + definitionPath);
                definator.load(definitionPath, entityClass)
                    .on('item', function(itemPath, Class, initialState) {
                        world.entities[file + '.' + itemPath.replace(/\//g, '.')] = {
                            constructor: Class,
                            initialState: initialState
                        };
                    })
                    .on('end', itemCallback);
            },
            callback
        );
    });
};

module.exports = new QuestingWorld().load();