while true;
exitcodeub=2;
do echo START\ $(date) >> exit_times
node index.js;
echo STOP\ $(date) >> exit_times
if [[ $? -eq $exitcodeub ]]; then exit; fi
sleep 5;
done
