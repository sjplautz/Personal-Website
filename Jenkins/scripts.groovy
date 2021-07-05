// need to have logic to handle case where last build for a file was unsuccessful?
// perhaps necessary if build fails for non-scropt related errors (ie a misconfigured endpoint?)
def getModifiedApps(applications){
    modified = [] 
    def apps = applications.split(",")
    for(app in apps){
        if(checkFolderForDiffs(app + "/"))
            modified.add(app)
    }
    return modified
}

def apply (collection, func){
    for (item in collection){
        func(item)
    }
}

def getdeps(app){
    print "getting dependencies for app: " + app
    dir("${app}"){
        if(app == "frontend-app")
            getFrontendDeps()
        else
            getPythonDeps()
    }
}

def compileApps(app){
    print "compiling app: " + app
    dir("${app}"){
        if(app == "frontend-app")
            compileFrontend()
        else
            compilePython()
    }
}

def buildContainers(app){
    print "building container for app: " + app
    dir("${app}"){
        if(app == "frontend-app")
            unstash 'dist'
        sh "docker build -t ${REGISTRY}:${app} ."
        sh "docker push ${REGISTRY}:${app}"
    }
}

def getFrontendDeps(){
    sh 'yarn'
}

def getPythonDeps(){
    print "got python project deps"
}

def compileFrontend(){
    sh 'yarn build:prod'
    stash includes: 'dist/', name: 'dist'
}

def compilePython(){
    print "compiled python project"
}

/*
 * Check a folder if changed in the latest commit.
 * Returns true if changed, or false if no changes.
 */
def checkFolderForDiffs(path) {
    try {
        // git diff will return 1 for changes (failure) which is caught in catch, or
        // 0 meaning no changes 
        sh "git diff --quiet --exit-code HEAD~1..HEAD ${path}"
        return false
    } catch (err) {
        return true
    }
}

return this