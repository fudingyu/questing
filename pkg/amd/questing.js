define('questing', [], function() {
  /**
  # Entity
  An entity is anything in the game that can be interacted with.  It has a definition
  file that is contained in the server data directory under entities and is contained 
  within a subdirectory that defines it's type.  These actions are taken care of by the 
  entity loader in the lib path.
  */
  function Entity(opts) {
      // ensure we have options
      opts = opts || {};
      
      // initialise member values
      this.id = parseInt(opts.id || 0, 10);
      this.type = opts.type || 'npc';
      type.kind = opts.kind || '';
      this.x = opts.x || 0;
      this.y = opts.y || 0;
  }
  
  Entity.prototype = {
      
  };
  
  
  var questing = {};
  questing.Entity = Entity;

  return questing;
});