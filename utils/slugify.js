const slugify=(str)=>str.replace(/\W+/g,'-').replace(/--+/g,'-').toLowerCase()

export default slugify;