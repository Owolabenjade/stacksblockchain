(define-map polls
  { poll-id: uint }
  {
    creator: principal,
    options: (list 20 { option-name: (string-ascii 20), votes: uint }),
    total-votes: uint
  }
)

(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (let ((existing-poll (map-get? polls { poll-id: poll-id })))
    (if (is-some existing-poll)
      (err u1) ;; Poll already exists
      (ok (map-set polls
          { poll-id: poll-id }
          {
            creator: tx-sender,
            options: (map (lambda (option) { option-name: option, votes: u0 }) options),
            total-votes: u0
          }
      ))
    )
  )
)

(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (match (map-get? polls { poll-id: poll-id })
    poll (match (find-option option-name (get options poll))
      option (let ((new-votes (+ (get votes option) u1)))
        (ok (map-set polls 
          { poll-id: poll-id }
          (merge poll 
            {
              options: (update-option option-name new-votes (get options poll)),
              total-votes: (+ u1 (get total-votes poll))
            }))))
      (err u3))
    (err u2))
)

(define-read-only (get-results (poll-id uint))
  (match (map-get? polls { poll-id: poll-id })
    poll (ok (get options poll))
    (err u4))
)

(define-private (find-option (option-name (string-ascii 20)) (options (list 20 { option-name: (string-ascii 20), votes: uint })))
  (fold check-option options
    { option-name: "", votes: u0 }
    (err u404))
)

(define-private (check-option (option { option-name: (string-ascii 20), votes: uint }) (acc (response { option-name: (string-ascii 20), votes: uint } uint)))
  (match acc
    found-option acc
    (if (is-eq (get option-name option) option-name)
      (ok option)
      acc)
  )
)

(define-private (update-option (option-name (string-ascii 20)) (new-votes uint) (options (list 20 { option-name: (string-ascii 20), votes: uint })))
  (map (lambda (option)
    (if (is-eq (get option-name option) option-name)
      (merge option { votes: new-votes })
      option
    )) options)
)