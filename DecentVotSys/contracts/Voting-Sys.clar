;; Define the map to store polls
(define-map polls
  { poll-id: uint }
  {
    creator: principal,
    options: (list 20 { option-name: (string-ascii 20), votes: uint }),
    total-votes: uint
  }
)

;; Function to create a new poll
(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (if (is-some (map-get? polls { poll-id: poll-id }))
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

;; Function to vote on a poll
(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (match (map-get? polls { poll-id: poll-id })
    poll (match (find-option option-name (get options poll))
      found-option (let (
        (new-votes (+ (get votes found-option) u1))
        (new-options (map (lambda (option)
          (if (is-eq (get option-name option) option-name)
            (merge option { votes: new-votes })
            option
          )
        ) (get options poll)))
      )
        (ok (map-set polls
          { poll-id: poll-id }
          (merge poll {
            options: new-options,
            total-votes: (+ u1 (get total-votes poll))
          })
        )))
      (err u3) ;; Option not found
    )
    (err u2) ;; Poll not found
  )
)

;; Function to get poll results
(define-read-only (get-results (poll-id uint))
  (match (map-get? polls { poll-id: poll-id })
    poll (ok (get options poll))
    (err u4) ;; Poll not found
  )
)

;; Helper function to find an option in the list
(define-private (find-option (option-name (string-ascii 20)) (options (list 20 { option-name: (string-ascii 20), votes: uint })))
  (fold check-option options
    none
  )
)

;; Helper function to check if an option matches the target name
(define-private (check-option (option { option-name: (string-ascii 20), votes: uint }) (acc (optional { option-name: (string-ascii 20), votes: uint })))
  (match acc
    found-option acc
    (if (is-eq (get option-name option) option-name)
      (some option)
      none
    )
  )
)